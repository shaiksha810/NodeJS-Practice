import mongoose from "mongoose";
import config from "../config/config.js";


const connectDB = async() => {
    await mongoose.connect(config.MONGO_URI)
    console.log("DB Connected");
}


export default connectDB