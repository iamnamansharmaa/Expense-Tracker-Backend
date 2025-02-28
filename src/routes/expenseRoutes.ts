import express, { Request, Response, Router } from "express";

import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  syncExpenses
} from "../Services/expenseService";

const router: Router = express.Router();

// Sync Expenses
router.post("/sync", async (req: Request, res: Response): Promise<void> => {
  try {
    const expenses = await syncExpenses(req.body);
    res.status(201).json({ message: "Expenses synced successfully!", expenses });
  } catch (error) {
    res.status(500).json({ message: "Error syncing expenses", error });
  }
});

// Get All Expenses
router.get("/sync/:UserUUID", async (req: Request, res: Response): Promise<void> => {
  try {
    const expenses = await getAllExpenses(req.params.UserUUID);

    if (!expenses.length) {
      res.status(404).json({ message: "No expenses found" });
      return;
    }

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get Single Expense
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const expense = await getExpenseById(req.params.id);

    if (!expense) {
      res.status(404).json({ message: "Expense not found" }); 
      return;
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Create Expense
router.post("/create", async (req: Request, res: Response): Promise<void> => {
  try {
    const expense = await createExpense(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error creating expense", error });
  }
});

// Update Expense
router.post("/update", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedExpense = await updateExpense(req.body._id, req.body);
    if (!updatedExpense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
});

// Delete Expense
router.delete("/delete/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedExpense = await deleteExpense(req.params.id);
    if (!deletedExpense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
});

export default router;