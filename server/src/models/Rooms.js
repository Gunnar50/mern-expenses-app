import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    code: {type: String, required:true},
    title: {type: String, required:true},
    users: [{type:mongoose.Schema.Types.ObjectId, ref: "users", }],
    expenses: [{type:mongoose.Schema.Types.ObjectId, ref: "expenses"}],
    total_amount: {type:Number, default: 0},
    created_at: {type:Date, default: Date.now()}
});

export const RoomModel = mongoose.model("rooms", RoomSchema) 
