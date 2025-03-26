import Message from "../models/Message.js";

export const getChatHistory = async (req, res) => {
  const userId = req.user.id;
  const friendId = req.params.friendId;

  try {
    const messages = await Message.find({
      $or: [
        { from: userId, to: friendId },
        { from: friendId, to: userId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    console.error("Failed to load chat history:", err);
    res.status(500).json({ error: "Failed to load chat history" });
  }
};
