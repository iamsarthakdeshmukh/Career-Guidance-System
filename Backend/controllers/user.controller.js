import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// User Signup
export const register = async (req, res) => {
    try {
        const { username, email, password, number, gender } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const newUser = new User({ username, email, password, number, gender });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = user.generateAuthToken();
        res.status(200).json({ 
            message: "Login successful", 
            token, 
            user: { id: user._id, email: user.email, username: user.username } 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // assuming req.user is populated by middleware
        const user = await User.findById(userId).select("-password"); // omit password
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user); // Send actual user data to frontend
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
