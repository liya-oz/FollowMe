export default function initSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("message", (data) => {
      console.log("Received message:", data);
      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
