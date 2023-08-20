import { UserModel } from "../models/Users.js";
import { ExpenseModel } from "../models/Expenses.js";
import { RoomModel } from "../models/Rooms.js";
import { generateUniqueCode } from "../utils/generate_room_code.js";

export const createRoom = async(req, res) => {
    try {
        const code = await generateUniqueCode();
        const room = new RoomModel({code: code, ...req.body});
        await room.save();
        res.json(room);
    } catch(err) {res.json(err);}

}

export const updateRoom = async(req, res) => {
    
}

export const getCurrentRoom = async(req, res) => {
    
}

export const getAllRooms = async(req, res) => {
    
}

export const deleteRoom = async(req, res) => {
    
}

export const calculateBalance = async(req, res) => {
    
}