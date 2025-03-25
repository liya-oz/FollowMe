export default function initSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    socket.on("message", (data) => {
      console.log("Simple roadcast message:", data);
      socket.broadcast.emit("message", data);
    });

    socket.on("private_message", ({ to, content }) => {
      const message = {
        from: socket.id, // 👈 Здесь можно заменить socket.id на socket.userId, если ты позже добавишь авторизацию
        to,
        content,
      };

      console.log("Private message:", message);

      io.to(to).emit("private_message", message);

      socket.emit("private_message", message);
    });

    // Пример будущей поддержки комнат (можно подключить позже)
    socket.on("join_room", (userId) => {
      socket.join(`user:${userId}`);
      console.log(`User ${userId} connected to room user:${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("USer was disconected:", socket.id);
    });
  });
}
