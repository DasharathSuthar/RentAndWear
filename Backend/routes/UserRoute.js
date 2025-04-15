import express from "express"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js"

const router = express.Router()
// Signup Route
router.post("/SignUp", async (req, res) => {
    try {
        const { fullName, email, username, password, phone, userType } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, username, password: hashedPassword, phone, userType });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, "your_secret_key", { expiresIn: "1h" });

        res.status(201).json({
            message: "User registered successfully!",
            user: { id: newUser._id, fullName, email, username, phone, userType },
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

// login user
router.post("/Login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, fullName: user.fullName, email: user.email, username: user.username, phone: user.phone, userType: user.userType },
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

export default router;