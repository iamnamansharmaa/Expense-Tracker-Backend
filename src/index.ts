import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db";
import expenseRoutes from "./routes/expenseRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

connectDB(); // Connect to MongoDB

const app = express();

app.use(express.json());  // JSON parser
app.use(cors());          // CORS handling
app.use(morgan("dev"));   // Logging requests

app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes); // Authentication routes

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Expense Tracker Backend is Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});