import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventAttendeeSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true },
);

export default mongoose.model("EventAttendee", eventAttendeeSchema);
