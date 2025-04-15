import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: String,
    img: String,
    price: Number,
    category: String,
    subcategory: String,
    size: String,
    description: String,
    location: String,
    status: String,
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
