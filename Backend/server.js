import express from "express"
import mongoose from "mongoose";
import MaleWearRoute from "./routes/MaleWearRoute.js"
import FemaleWearRoute from "./routes/FemaleWearRoute.js"
import UserRoute from "./routes/UserRoute.js"
import ContactRoute from './routes/ContactRoute.js'
import OrderRoute from './routes/OrderRoute.js'
import CartRoute from './routes/CartRoute.js'
import bodyParser from "body-parser";
import cors from "cors"
const app = express()


app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

app.use("/MaleWear",MaleWearRoute);
app.use("/FemaleWear",FemaleWearRoute);
app.use("/User",UserRoute);
app.use("/Contact",ContactRoute);
app.use("/Order",OrderRoute);
app.use("/Cart",CartRoute);

const MongoUrl = "mongodb://127.0.0.1:27017/rentandwearDB"

async function main() {
    await mongoose.connect(MongoUrl);
}
// main method connected with Db
main().then(() => {
    console.log("connected succsessfuly");
}).catch(err => console.log(err))


app.listen(8080,()=> {
    console.log("Server Connected");
    console.log("http://localhost:8080/");
    
})