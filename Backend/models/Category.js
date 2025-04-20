import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String }, // Store image URL or emoji
  status: { type: String, default: "Active" },
});

export default mongoose.model("Category", categorySchema);
