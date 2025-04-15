import express from "express"
const router = express.Router()
import Contact from "../models/Contact.js"

// Contact Form Submission Route
router.post("/", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: "Request submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to submit request" });
    }
});

// Retrieve Contact Requests for Admin
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve contact requests" });
    }
});

export default router;
