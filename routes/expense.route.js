import express from "express";
import {
  addExpense,
  getAllExpenses,
  deleteExpense,
  getExpensesByCategory,
} from "../controllers/expense.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.use(auth);
router.post("/", addExpense);
router.get("/", getAllExpenses);
router.delete("/:id", deleteExpense);
router.get("/category/:category", getExpensesByCategory);

export default router;
