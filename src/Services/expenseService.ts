import Expense from "../models/Expense";

export const createExpense = async (data: any) => {
  return await Expense.create(data);
};

export const getAllExpenses = async (userUUID: string) => {
  return await Expense.find({ userUUID });
};

export const getExpenseById = async (id: string) => {
  return await Expense.findById(id);
};

export const updateExpense = async (_id: string, data: any) => {
  return await Expense.findByIdAndUpdate(_id, data, { new: true });
};

export const deleteExpense = async (id: string) => {
  return await Expense.findByIdAndDelete(id);
};

export const syncExpenses = async (expenses: any[]) => {
  return await Expense.insertMany(expenses, { ordered: false });
};