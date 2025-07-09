import express from "express";
import { getTweetData } from "../controllers/complaint.controller.js";
import authMiddleware  from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id/tweet-data", authMiddleware, getTweetData);

export default router;
