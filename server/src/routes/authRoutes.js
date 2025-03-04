import express from "express";
import { createUser, login, getUsers } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", createUser);

router.post("/login", login);

router.get("/", getUsers);

export default router;
