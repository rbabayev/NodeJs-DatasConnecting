import { Expense } from "../models/expense.model.js";

export const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, userId: req.user.id });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllExpenses = async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
};

export const deleteExpense = async (req, res) => {
  await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "deleted successfully" });
};

export const getExpensesByCategory = async (req, res) => {
  const expenses = await Expense.find({
    userId: req.user.id,
    category: req.params.category,
  });
  res.json(expenses);
};
