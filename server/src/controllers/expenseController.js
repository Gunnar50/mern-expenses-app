import { UserModel } from "../models/Users.js";
import { RoomModel } from "../models/Rooms.js";
import { ExpenseModel } from "../models/Expenses.js";

export const createExpense = async(req, res) => {
    try {
        const expense = new ExpenseModel(req.body);
        await expense.save();
        res.json(expense);
    } catch(err) {res.json(err);}

}

export const updateExpense = async(req, res) => {
    
}

export const getExpenseID = async(req, res) => {
    
}

export const getAllExpenses = async(req, res) => {
    
}

export const deleteExpense = async(req, res) => {
    
}


