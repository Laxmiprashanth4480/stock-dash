import express from "express";
import { submitFeedback } from "../controllers/ContactController.js";

const router = express.Router();
router.post("/submit", submitFeedback);

export default router;
