import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
console.log("WebSocket URL from Vite:", import.meta.env.VITE_SOCKET_URL);

const MAX_RECONNECT_ATTEMPTS = Infinity;
const RECONNECT_DELAY_MS = 1000;

let isConnected = false;
let reconnectAttempts = 0;

const socket = io(SOCKET_URL, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("authToken"),
  },
  reconnection: true,
  reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
  reconnectionDelay: RECONNECT_DELAY_MS,
  transports: ["websocket", "polling"],
  path: "/socket.io",
});

export const getConnectionStatus = () => isConnected;

const attemptReconnect = () => {
  if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    reconnectAttempts++;
    console.log(
      `Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`,
    );
    setTimeout(() => {
      socket.connect();
    }, RECONNECT_DELAY_MS * reconnectAttempts);
  } else {
    console.error("Max reconnection attempts reached");
  }
};

socket.on("connect", () => {
  isConnected = true;
  reconnectAttempts = 0;
  console.log("Socket connected to", SOCKET_URL);
});

socket.on("disconnect", (reason) => {
  isConnected = false;
  console.log("Socket disconnected:", reason);
  if (reason === "io server disconnect") {
    socket.connect();
  } else {
    attemptReconnect();
  }
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err.message);
  attemptReconnect();
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
});

socket.on("private_message_error", (error) => {
  console.error("Message error:", error);
});

socket.on("unauthorized", (reason) => {
  console.error("Unauthorized:", reason);
  localStorage.removeItem("authToken");
});

export default socket;
