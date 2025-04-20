import mongoose from "mongoose"
import initData from "./data.js"
import MaleWear from "../models/MaleWear.js"
import FemaleWear from "../models/FemaleWear.js"

const MongoUrl = "mongodb://127.0.0.1:27017/rentandwearDB"

// main method connected with Db
main().then(() => {
    console.log("connected succsessfuly");
}).catch(err => console.log(err))

async function main() {
    await mongoose.connect(MongoUrl);
}

const initDB = async () => {
    await MaleWear.deleteMany({});
    await MaleWear.insertMany(initData.MaleData);
    await FemaleWear.deleteMany({})
    await FemaleWear.insertMany(initData.FemaleData);
    console.log("data was initialized");
};

initDB();