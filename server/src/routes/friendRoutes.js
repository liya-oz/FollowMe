import express from "express";
import {
  getFriends,
  removeFriend,
  addFriend,
  checkFriendship,
} from "../controllers/friendController.js";
import { authenticate } from "../util/authenticate.js";

const router = express.Router();

router.post("/", authenticate, addFriend);
router.get("/", authenticate, getFriends);
router.delete("/:friendId", authenticate, removeFriend);
router.get("/check/:friendId", authenticate, checkFriendship);

export default router;
