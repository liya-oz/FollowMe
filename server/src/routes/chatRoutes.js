import express from "express";
import { getChatHistory } from "../controllers/chatController.js";
import { authenticate } from "../util/authenticate.js";

const router = express.Router();

router.get("/history/:friendId", authenticate, getChatHistory);

export default router;
