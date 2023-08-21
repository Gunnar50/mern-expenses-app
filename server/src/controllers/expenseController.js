import { UserModel } from "../models/Users.js";
import { RoomModel } from "../models/Rooms.js";
import { ExpenseModel } from "../models/Expenses.js";

export const createExpense = async(req, res) => {
    try {
        const roomID = req.body.roomID;
        const room = await RoomModel.findById(roomID);
        const expenseID = req.body.expenseID;
        const newExpense = new ExpenseModel(expenseID);
        await newExpense.save();

        room.expenses.push(newExpense);

        res.json({newExpenseList: room.expenses});
    } catch(err) {res.json(err);}

}

export const updateExpense = async(req, res) => {
    try {
        const expenseID = req.params.expenseid;
        const newExpense = req.body;
        const result = await ExpenseModel.findByIdAndUpdate(expenseID, newExpense, {new:true});
        
        
        res.json(result);
        
    } catch(err) {res.json(err);}
}

export const getExpenseID = async(req, res) => {
    try {
        const expense = await ExpenseModel.findById(req.params.expenseid);
        res.json(expense);
    } catch (error) {
        console.log(error);
    }
}

export const getAllExpenses = async(req, res) => {
    
}

export const deleteExpense = async(req, res) => {
    try {
        const expenseID = req.params.expenseid;
        // remove the expense object
        const result = await ExpenseModel.findByIdAndDelete(expenseID);
        
        // remove the expense from all the rooms that has this expense id (should be only one)
        await RoomModel.updateMany({expenses: expenseID}, {$pull: {expenses: expenseID}});
        
        res.json(result);
        
    } catch(err) {res.json(err);}
}


