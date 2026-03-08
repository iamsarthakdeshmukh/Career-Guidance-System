// routes/userRoutes.js
import express from "express";
import { register, login, getUserProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);

router.get('/me', authMiddleware, getUserProfile);


// Protected Route Example
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "User profile", user: req.user });
});

export default router;
