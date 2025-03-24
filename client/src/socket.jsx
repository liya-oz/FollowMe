import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { autoConnect: false });

export const connectSocket = (token) => {
  socket.auth = { token };
  socket.connect();

  socket.on("connect", () => {
    console.log("Socket connected! ID:", socket.id);

    socket.emit("message", "hello world");
  });

  return socket;
};

export default socket;
