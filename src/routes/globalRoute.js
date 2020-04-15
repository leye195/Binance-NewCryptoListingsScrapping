import express from "express";
import { startSchedule, endSchedule } from "../controllers/coinController";
const app = express.Router();
app.get("/", startSchedule);
app.get("/end", endSchedule);
export default app;
