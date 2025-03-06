import express from "express";
import {
  getEventAttendees,
  createEventAttendee,
  deleteEventAttendee,
  getUserEvents,
} from "../controllers/eventAttendeeController.js";
import { authenticate } from "../util/authenticate.js";

const router = express.Router();

router.get("/", getEventAttendees);

router.get("/my-events", authenticate, getUserEvents);

router.post("/", authenticate, createEventAttendee);

router.delete("/:id", authenticate, deleteEventAttendee);

export default router;
