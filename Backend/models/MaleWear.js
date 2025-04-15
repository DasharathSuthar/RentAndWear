import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MaleWearSchema = new Schema({
    title: String,
    image:String,
    price:Number,
    category:String,
    subcategory:String,
    size:String,
    description:String,

})

export default mongoose.model("MaleWear", MaleWearSchema);