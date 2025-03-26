import jwt from "jsonwebtoken";
import { handlePrivateMessage } from "./controllers/chatSocketHandler.js";
import { validateMessage } from "./util/messageValidation.js";

const createRateLimiter = (limit, windowMs) => {
  const timestamps = new Map();

  return (socket) => {
    const now = Date.now();
    const times = timestamps.get(socket.id) || [];
    const filtered = times.filter((ts) => now - ts < windowMs);
    filtered.push(now);
    timestamps.set(socket.id, filtered);

    if (filtered.length > limit) {
      socket.emit("error", "Message rate limit exceeded");
      return false;
    }
    return true;
  };
};

const rateLimiter = createRateLimiter(10, 1000);

export default function initSocketHandlers(io) {
  // JWT auth middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return next(new Error("Authentication error: Token expired"));
      }
      return next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("New user connected:", socket.id, "User ID:", socket.userId);
    socket.join(`user:${socket.userId}`);

    socket.on("private_message", ({ to, content }) => {
      if (!rateLimiter(socket)) return;

      const validation = validateMessage({ to, content });
      if (!validation.valid) {
        return socket.emit("error", validation.error);
      }

      handlePrivateMessage(socket, io, { to, content });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  });
}
