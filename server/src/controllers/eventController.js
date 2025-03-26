import Event from "../models/Event.js";
import EventAttendee from "../models/EventAttendee.js";
import { logError } from "../util/logging.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, result: events });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { keyword, category, location, from, to, limit, page } = req.query;
    const filter = {};

    if (keyword) {
      const words = keyword.trim().split(/\s+/);
      filter.$and = words.map((word) => ({
        $or: [
          { title: { $regex: word, $options: "i" } },
          { category: { $regex: word, $options: "i" } },
          { location: { $regex: word, $options: "i" } },
        ],
      }));
    }

    if (category && category !== "All Category") {
      filter.category = category;
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (from || to) {
      filter.time = {};
      if (from) filter.time.$gte = new Date(from);
      if (to) filter.time.$lte = new Date(to);
    }

    const resultsLimit = parseInt(limit, 10) || 6;
    const pageNumber = parseInt(page, 10) || 1;
    const skip = (pageNumber - 1) * resultsLimit;
    const events = await Event.find(filter).skip(skip).limit(resultsLimit);
    res.status(200).json({ success: true, result: events });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId).populate(
      "createdBy",
      "name profilePhoto",
    );

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const eventData = {
      title: req.body.title,
      image: req.body.image,
      category: req.body.category,
      location: req.body.location,
      description: req.body.description,
      time: req.body.time,
      maxParticipants: req.body.maxParticipants,
      createdBy: req.user.id,
    };

    const newEvent = await Event.create(eventData);

    await EventAttendee.create({
      eventId: newEvent._id,
      userId: req.user.id,
    });

    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this event",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this event",
      });
    }

    await Event.findByIdAndDelete(eventId);
    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
