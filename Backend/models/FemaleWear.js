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
});


export default mongoose.model("FemaleWear", FemaleWearSchema);