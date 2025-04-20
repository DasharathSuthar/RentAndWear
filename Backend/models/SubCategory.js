import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    icon: { type: String },
    status: { type: String, default: "Active" },
});

export default mongoose.model("SubCategory", subCategorySchema);
