import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;