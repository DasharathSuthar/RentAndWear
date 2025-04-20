import express from 'express';
const router = express.Router();
import Order from '../models/Orders.js';

// POST: Create a new order
router.post("/", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Checkout details saved successfully!" });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Failed to save checkout details" });
    }
});

// GET: Retrieve all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find({}).populate("userId"); // Optional: populate user data
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to get checkout details" });
    }
});

export default router;
