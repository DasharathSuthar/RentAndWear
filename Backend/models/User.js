import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: String,
    email: String,
    username: String,
    password: String,
    phone: String,
    userType: String
});

const User = mongoose.model("User", userSchema);
export default User;