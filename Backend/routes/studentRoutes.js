import express from "express";
import { analyzeStudentData } from "../controllers/studentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to analyze student data and get career suggestion
router.post("/analyze",authMiddleware, analyzeStudentData);

export default router;
