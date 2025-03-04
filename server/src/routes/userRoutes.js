import express from "express";
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/userController.js";
import { authenticate } from "../util/authenticate.js";

const router = express.Router();

router.get("/:id", getProfile);

router.put("/:id", authenticate, updateProfile);

router.delete("/:id", authenticate, deleteProfile);

export default router;
