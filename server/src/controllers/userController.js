import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (user) {
        return res.json({ message: "Email already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name: name, email: email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully!" });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) return res.json({ message: "Email or Password is incorrect!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.json({ message: "Email or Password is incorrect!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token: token, userID: user._id });
};

export const getCurrentUser = async (req, res) => {
    try{    
        const user = await UserModel.findById(req.params.id);
        res.json({name: user.name});
    } catch(err) {console.log(err);}
}

export const verifyToken = (req, res) => {
    // Since the auth middleware is already verifying the token, 
    // you can just respond here that it's valid.
    res.json({ valid: true });
};
