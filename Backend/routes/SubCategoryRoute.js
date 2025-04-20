import express from "express";
import SubCategory from "../models/SubCategory.js";

const router = express.Router();

// GET all subcategories
router.get("/", async (req, res) => {
    try {
      const subs = await SubCategory.find().populate("category"); // <-- This line is crucial
      res.json(subs);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch subcategories" });
    }
  });
  
// POST new subcategory
router.post("/", async (req, res) => {
  try {
    const sub = new SubCategory(req.body);
    await sub.save();
    res.status(201).json(sub);
  } catch (err) {
    res.status(400).json({ error: "Failed to add subcategory" });
  }
});

// PUT update subcategory
router.put("/:id", async (req, res) => {
  try {
    const updated = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update subcategory" });
  }
});

// DELETE subcategory
router.delete("/:id", async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Subcategory deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete subcategory" });
  }
});

export default router;
