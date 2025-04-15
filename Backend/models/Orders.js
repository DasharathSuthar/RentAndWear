import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: String,
    products: [
        {
            title: String,
            image: String,
            price: Number,
            category: String,
            subcategory: String,
            size: String,
            description: String
        }
    ],
    totalDays: Number,
    totalAmount: Number,
    deposit: Number,
    finalAmount: Number,
    bookingDate: String,
    startDate: String, // Added start date
    returnDate: String, // Added return date
    confirm: String,
    status: String,
    payment: String
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
