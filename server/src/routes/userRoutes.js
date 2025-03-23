import express from "express";
import {
  getUserEvents,
  getUserUpcomingEvents,
  getMe,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/userController.js";
import { authenticate } from "../util/authenticate.js";

const router = express.Router();

router.get("/user-events/:id", authenticate, getUserEvents);
router.get("/user-upcoming-events/:id", authenticate, getUserUpcomingEvents);

router.get("/me", authenticate, getMe);
router.get("/:id", getProfile);
router.put("/:id", authenticate, updateProfile);
router.delete("/:id", authenticate, deleteProfile);

export default router;
