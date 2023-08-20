import express from "express";
import { getExpenseID, createExpense, updateExpense, getAllExpenses, deleteExpense } from "../controllers/expenseController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/add", createExpense); // add a new expense
router.put("/update", updateExpense); // update a expense
router.delete("/remove", deleteExpense); // remove a expense
router.get("/", getAllExpenses); // get a list of expenses in the current room, all of them
router.get("/:expenseid", getExpenseID); // get a single expense by ID

export {router as expenseRouter}


