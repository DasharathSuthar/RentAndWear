import express from "express";
import mongoose from "mongoose";
import Cart from "../models/Cart.js";

const router = express.Router();

// Save cart
router.post("/save", async (req, res) => {
    try {
        const { userId, items } = req.body;
        if (!userId || !items) {
            return res.status(400).json({ message: "Missing userId or items" });
        }

        const cart = new Cart({ userId, items });
        await cart.save();

        res.status(201).json({ message: "Cart saved successfully", cart });
    } catch (error) {
        console.error("Error saving cart:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all carts for a specific user
router.get("/:userId", async (req, res) => {
    try {
        const carts = await Cart.find({ userId: req.params.userId }).populate("userId", "fullName email");
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Remove a specific item from the cart
router.delete("/:userId/item/:itemId", async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Ensure itemId is treated as ObjectId correctly
        const objectId = new mongoose.Types.ObjectId(itemId);  // Use 'new' to instantiate ObjectId

        // Remove the item from the cart
        cart.items = cart.items.filter(item => item._id.toString() !== objectId.toString());

        await cart.save();

        res.json({ message: "Item removed from cart", cart });
    } catch (err) {
        console.error("Error removing item:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Clear all items in a user's cart (e.g., when proceeding to checkout)
router.delete("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove all items from the cart
        cart.items = [];
        await cart.save();

        res.json({ message: "Cart cleared", cart });
    } catch (err) {
        console.error("Error clearing cart:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
