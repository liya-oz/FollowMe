import express from "express";
import {
  getFriends,
  removeFriend,
  addFriend,
} from "../controllers/friendController.js";
import { authenticate } from "../util/authenticate.js";

const router = express.Router();

router.post("/", authenticate, addFriend);
router.get("/", authenticate, getFriends);
router.delete("/:friendId", authenticate, removeFriend);

export default router;
