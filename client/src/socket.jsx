import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("authToken"),
  },
});

export default socket;
//auth.token on server is socket.handshake.auth.token.
