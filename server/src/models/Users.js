import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type:String, required:true, unique: true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    cash_amount: {type:String, required:true, default:0},
    created_at: {type:Date, default: Date.now()}
});

export const UserModel = mongoose.model("users", UserSchema) // "users" is the name of the collection 
