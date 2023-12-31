import express from "express";
import { registerUser, loginUser, verifyToken, getCurrentUser } from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", getCurrentUser);
router.get("/verify-token", authMiddleware, verifyToken); // applied the middleware before the verifyToken controller

export {router as userRouter}


