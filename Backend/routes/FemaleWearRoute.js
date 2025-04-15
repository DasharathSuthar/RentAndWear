import express from "express"
const router = express.Router()
import FemaleWear from "../models/FemaleWear.js"

router.get("/", async (req, res) => {
    try {
        await FemaleWear.find({})
            .then(response => {
                res.status(200).json({ List: response })
            })
            .catch(error => {
                res.status(500).json({ Message: error })
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ Message: "Internal Server Error" })
    }
})
// GET product by ID
router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const response = await FemaleWear.findById(id);
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

        const updatedProduct = await FemaleWear.findByIdAndUpdate(id, updatedData, {
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
router.delete("/:id", async (req, res) => {
    try {
      let { id } = req.params;
      const deletedProduct = await FemaleWear.findByIdAndDelete(id);
  
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
  

export default router
