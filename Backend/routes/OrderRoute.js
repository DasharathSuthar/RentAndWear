import express from 'express';
const router = express.Router()
import Order from '../models/Orders.js';

router.post("/", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Checkout details saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save checkout details" });
    }
});

router.get("/", async (req, res) => {
    try {
        await Order.find({})
            .then(response => {
                res.status(200).json({ Order: response })
            })
            .catch(error => {
                res.status(500).json({ Message: error })
            })
    } catch (error) {
        res.status(500).json({ error: "Failed to get checkout details" });

    }
})
export default router;