import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// Message validation schema
const validateMessage = (message) => {
  if (!message.to || !message.content) {
    return { valid: false, error: "Recipient and content are required" };
  }

  if (typeof message.content !== "string" || message.content.trim() === "") {
    return {
      valid: false,
      error: "Message content must be a non-empty string",
    };
  }

  if (message.content.length > 1000) {
    return { valid: false, error: "Message too long (max 1000 characters)" };
  }

  return { valid: true };
};

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

const rateLimiter = createRateLimiter(10, 1000); // max 10 messages/sec

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

    // Handle private messages with rate limiting
    socket.on("private_message", ({ to, content }) => {
      if (!rateLimiter(socket)) return;

      const validation = validateMessage({ to, content });
      if (!validation.valid) {
        return socket.emit("error", validation.error);
      }

      if (to === socket.userId) {
        return socket.emit("error", "Cannot send message to yourself");
      }

      const message = {
        id: uuidv4(),
        from: socket.userId,
        to,
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };

      console.log("Private message:", message);
      io.to(`user:${to}`).emit("private_message", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  });
}
