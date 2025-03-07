import express from "express";

import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import cors from "cors";
import eventAttendeeRouter from "./routes/eventAttendeeRoutes.js";

// Create an express server
const app = express();
app.use(cors());
// Tell express to use the json middleware
app.use(express.json());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);
app.use("/api/event-attendees", eventAttendeeRouter);

export default app;
