import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3, "minimum 3 characters are required"],
        maxLength:[15, "minimum 15 characters are required"]
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }
})


const userModel = mongoose.model("user", userSchema)
export default userModel