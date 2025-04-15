import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Product from "./models/Product.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/rentandwearDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    username: String,
    password: String,
    phone: String,
    userType: String
});

const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
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

// Login Route
app.post("/login", async (req, res) => {
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




// Define Order Schema
const orderSchema = new mongoose.Schema({
    userId: String,
    products: [
        {
            title: String,
            image: String,
            price: Number
        }
    ],
    totalDays: Number,
    totalAmount: Number,
    deposit: Number,
    finalAmount: Number,
    bookingDate: String,
    confirm: String,
    status: String,
    payment: String
});

const Order = mongoose.model("Order", orderSchema);

// Save Checkout Details API
app.post("/api/checkout", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Checkout details saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save checkout details" });
    }
});



const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// Contact Form Submission Route
app.post("/api/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: "Request submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to submit request" });
    }
});

// Retrieve Contact Requests for Admin
app.get("/api/contact", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve contact requests" });
    }
});

app.post("/api/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: "Product added successfully!", product });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error });
    }
});

// Get all products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});


// module.exports = router;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
