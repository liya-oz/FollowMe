import EventAttendee from "../models/EventAttendee.js";
import Event from "../models/Event.js";
import { logError } from "../util/logging.js";

export const getEventAttendees = async (req, res) => {
  try {
    const { eventId } = req.query;
    const filter = {};
    if (eventId) {
      filter.eventId = eventId;
    }
    const attendees = await EventAttendee.find(filter)
      .populate("userId", "-password")
      .populate("eventId");
    res.status(200).json({ success: true, result: attendees });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEventAttendee = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const { eventId } = req.body;
    const userId = req.user.id;

    if (!eventId) {
      return res
        .status(400)
        .json({ success: false, message: "EventId is required" });
    }

    const existingAttendee = await EventAttendee.findOne({ eventId, userId });
    if (existingAttendee) {
      return res.status(400).json({
        success: false,
        message: "User already registered for this event",
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const currentCount = await EventAttendee.countDocuments({ eventId });

    if (event.maxParticipants && currentCount >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: "Event is full. Maximum number of participants reached.",
      });
    }

    const newAttendee = await EventAttendee.create({ eventId, userId });
    res.status(201).json({ success: true, attendee: newAttendee });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEventAttendee = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const attendeeId = req.params.id;
    const attendee = await EventAttendee.findById(attendeeId);
    if (!attendee) {
      return res
        .status(404)
        .json({ success: false, message: "Attendee not found" });
    }

    if (attendee.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this registration",
      });
    }

    await EventAttendee.findByIdAndDelete(attendeeId);
    res.status(200).json({
      success: true,
      message: "Registration cancelled successfully",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const userId = req.user.id;
    const registrations = await EventAttendee.find({ userId }).populate(
      "eventId",
    );
    const events = registrations.map((reg) => reg.eventId);

    res.status(200).json({ success: true, result: events });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
