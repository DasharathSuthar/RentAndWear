import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FemaleWearSchema = new Schema({
    title: String,
    image:String,
    price:String,
    category:String,
    subcategory:String,
    size:String,
    description:String,

})

export default mongoose.model("FemaleWear", FemaleWearSchema);