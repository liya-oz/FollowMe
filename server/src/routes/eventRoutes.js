import express from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { authenticate } from "../util/authenticate.js";

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post("/", authenticate, createEvent);

router.put("/:id", authenticate, updateEvent);

router.delete("/:id", authenticate, deleteEvent);

export default router;
