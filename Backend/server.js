import dotenv from 'dotenv'
dotenv.config()

import express from "express"
import mongoose from "mongoose";
import MaleWearRoute from "./routes/MaleWearRoute.js"
import FemaleWearRoute from "./routes/FemaleWearRoute.js"
import UserRoute from "./routes/UserRoute.js"
import ContactRoute from './routes/ContactRoute.js'
import OrderRoute from './routes/OrderRoute.js'
import CartRoute from './routes/CartRoute.js'
import CategoryRoute from './routes/CategoryRoute.js'
import SubCategoryRoute from './routes/SubCategoryRoute.js'
import bodyParser from "body-parser";
import cors from "cors"
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/MaleWear", MaleWearRoute);
app.use("/FemaleWear", FemaleWearRoute);
app.use("/User", UserRoute);
app.use("/Contact", ContactRoute);
app.use("/Order", OrderRoute);
app.use("/Cart", CartRoute);
app.use("/categories", CategoryRoute)
app.use("/subcategories", SubCategoryRoute)

const MongoUrl = process.env.DATABASE_URL;
const PORT = process.env.PORT || 8080

if (!MongoUrl) {
    console.error("DATABASE_URL not set!");
    process.exit(1);
}

mongoose.connect(MongoUrl)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
})