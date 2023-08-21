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

export const joinRoom = async(req, res) => {
    try {
        const userID = req.body.userID;
        const roomID = req.body.roomID;

        const room = await RoomModel.findById(roomID);
        const user = await UserModel.findById(userID);

        for (let index = 0; index < room.users.length; index++) {
            const userID = room.users[index];
            if(userID === user._id) return res.json({message: "User already in room"});
        }

        room.users.push(user);
        await room.save();

        res.json({users: room.users});

    } catch (error) {
        console.log(error);
    }
}

export const updateRoom = async(req, res) => {
    
}

export const getCurrentRoom = async(req, res) => {
    try {
        const room = await RoomModel.findById(req.params.roomid);
        res.json(room);
    } catch (error) {
        console.log(error);
    }
}

export const getAllRooms = async(req, res) => {
    // all room per user NOT DONE
    try {
        const userid = req.params.userid;
        const rooms = await RoomModel.find({creator: req.params.userid}).populate("creator", "username").exec();
        res.json(rooms);
    } catch (error) {
        console.log(error);
    }
}

export const deleteRoom = async(req, res) => {
    try {
        const roomid = req.params.roomid;

        const room = await RoomModel.findById(roomid);
        
        // remove each expense from the room
        for (let index = 0; index < room.expenses.length; index++) {
            const expenseID = room.expenses[index];
            await ExpenseModel.findByIdAndDelete(expenseID);
        }

        // remove the room object
        const result = await RoomModel.findByIdAndDelete(roomid);
       
        res.status(200).json({message: "success"});
        
    } catch(err) {res.json(err);}
}

export const calculateBalance = async(req, res) => {
    
}