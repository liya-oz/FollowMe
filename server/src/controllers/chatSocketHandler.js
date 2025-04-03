import { v4 as uuidv4 } from "uuid";
import Message from "../models/Message.js";

export const handlePrivateMessage = async (socket, io, { to, content }) => {
  const from = socket.userId;

  if (to === from) {
    return socket.emit("error", "Cannot message yourself");
  }

  const messageData = {
    id: uuidv4(),
    from,
    to,
    content: content.trim(),
    timestamp: new Date().toISOString(),
  };

  try {
    await Message.create(messageData);
    console.log("Saved message to DB:", messageData); // Extra check for DB. Just for sure
    io.to(`user:${to}`).emit("private_message", messageData);
  } catch (err) {
    console.error("Failed to save message:", err);
    socket.emit("error", "Failed to save message");
  }
};
