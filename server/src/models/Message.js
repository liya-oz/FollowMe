import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  id: { type: String, required: true }, //It is UUID
  from: { type: String, required: true },
  to: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
