import mongoose from "mongoose";
const Schema = mongoose.Schema;
const cartItemSchema = new Schema({
  title: String,
  itemImg: String,
  price: Number,
  category: String,
  subcategory: String,
  size: String,
  description: String,
  status: String,
});

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // assuming you have a User model
    required: true,
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Cart", cartSchema);
