import jwt from "jsonwebtoken";

export default function initSocketHandlers(io) {
  // JWT middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      console.log("No token provided");
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      console.log("Invalid token:", err.message);
      return next(new Error("Authentication error"));
    }
  });

  // Connection handler
  io.on("connection", (socket) => {
    console.log("New user connected:", socket.id, "User ID:", socket.userId);

    socket.join(`user:${socket.userId}`);
    console.log(`User ${socket.userId} joined room user:${socket.userId}`);

    socket.on("private_message", ({ to, content }) => {
      const message = {
        from: socket.userId,
        to,
        content,
      };

      console.log("Private message:", message);

      io.to(`user:${to}`).emit("private_message", message);
      socket.emit("private_message", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
