import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true},
    userUUID: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
