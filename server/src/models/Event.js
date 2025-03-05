import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: "" },
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, default: "" },
    time: { type: Date, required: true },
    maxParticipants: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Event", eventSchema);
