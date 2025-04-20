import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
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
    startDate: String, 
    returnDate: String, 
    confirm: String,
    status: String,
    payment: String,
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
