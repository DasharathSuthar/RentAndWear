import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Sign Up
router.post("/SignUp", async (req, res) => {
  try {
    const { fullName, email, username, password, phone, userType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, username, password: hashedPassword, phone, userType });
    await newUser.save();

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

// Login
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
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        phone: user.phone,
        userType: user.userType
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Forgot Password - Step 1: Verify email and phone
router.post("/ForgotPasswordVerify", async (req, res) => {
  try {
    const { email, mobile } = req.body;

    const user = await User.findOne({ email, phone: mobile });

    if (!user) {
      return res.status(400).json({ message: "User not found with provided email and mobile number." });
    }

    res.status(200).json({ message: "Verification successful." });
  } catch (error) {
    res.status(500).json({ message: "Server error during verification.", error });
  }
});

// Forgot Password - Step 2: Reset password
router.post("/ResetPassword", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error during password reset.", error });
  }
});

export default router;
