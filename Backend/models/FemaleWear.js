import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FemaleWearSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    category: String,
    subcategory: String,
    sizes: [String],
    description: String,
    createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("FemaleWear", FemaleWearSchema);