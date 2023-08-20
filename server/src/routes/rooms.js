import express from "express";
import { createRoom, updateRoom, getCurrentRoom, getAllRooms, deleteRoom, calculateBalance } from "../controllers/roomController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/add", createRoom); // add a new room
router.put("/update", updateRoom); // update a room
router.delete("/remove/:roomid", deleteRoom); // remove a room
router.get("/:userid", getAllRooms); // get a list of rooms per user
router.get("/:roomid", getCurrentRoom); // get a current room by ID
router.get("/balance", calculateBalance); // calculate the current balance


export {router as roomRouter}


