import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import DB connection
import userRoutes from "./routes/userRoutes.js"; // Import user routes
import studentRoutes from "./routes/studentRoutes.js"; // Import student routes
import cors from "cors"; // Import cors middleware

dotenv.config();

const app = express();

// Middleware for CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow requests from your frontend
  methods: "GET,POST,PUT,DELETE",  // Allow only these methods
  credentials: true, // Allow credentials like cookies, authorization headers
}));

// Database Connection
connectDB();

// Middleware
app.use(express.json()); // Body parser is handled by express
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes); // Mount user routes under '/api/users'
app.use("/api/users", studentRoutes); // Mount student routes

export default app;
