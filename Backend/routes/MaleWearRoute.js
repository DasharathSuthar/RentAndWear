import express from "express";
const router = express.Router();
import MaleWear from "../models/MaleWear.js";

// GET all products
router.get("/", async (req, res) => {
    try {
        const response = await MaleWear.find({});
        res.status(200).json({ List: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

// GET product by ID
router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const response = await MaleWear.findById(id);
        if (response) {
            res.status(200).json({ ByIdData: response });
        } else {
            res.status(404).json({ Message: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Error fetching product" });
    }
});

// PUT (update) product by ID
router.put("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const updatedData = req.body;

        const updatedProduct = await MaleWear.findByIdAndUpdate(id, updatedData, {
            new: true, // returns the updated document
            runValidators: true,
        });

        if (updatedProduct) {
            res.status(200).json({ Message: "Product updated successfully", UpdatedProduct: updatedProduct });
        } else {
            res.status(404).json({ Message: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Error updating product" });
    }
});

// DELETE product by ID
router.delete("/:id", async (req, res) => {
    try {
      let { id } = req.params;
      const deletedProduct = await MaleWear.findByIdAndDelete(id);
  
      if (deletedProduct) {
        res.status(200).json({ Message: "Product deleted successfully", DeletedData: deletedProduct });
      } else {
        res.status(404).json({ Message: "Product not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ Message: "Error deleting product" });
    }
  });
  

export default router;
