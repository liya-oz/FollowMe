import Event from "../models/Event.js";
import { logError } from "../util/logging.js";

export const getEvents = async (req, res) => {
  try {
    const { title, category, location, startTime, endTime } = req.query;
    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (startTime || endTime) {
      filter.time = {};
      if (startTime) {
        filter.time.$gte = new Date(startTime);
      }
      if (endTime) {
        filter.time.$lte = new Date(endTime);
      }
    }

    const events = await Event.find(filter);
    res.status(200).json({ success: true, result: events });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
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
