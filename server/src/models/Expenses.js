import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    title: {type:String, required:true},
    price: {type:mongoose.Schema.Types.Decimal128, required:true},
    paid_by: {type:mongoose.Schema.Types.ObjectId, ref: "users", required:true},
    participants: [{type:mongoose.Schema.Types.ObjectId, ref: "users"}],
    created_at: {type:Date, default: Date.now()}
});

export const ExpenseModel = mongoose.model("expenses", ExpenseSchema) // "users" is the name of the collection 
