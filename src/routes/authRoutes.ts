import express, { Request, Response } from "express";
import { signup, login } from "../Services/authService";

const router = express.Router();

// Signup Route
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { _id, email, password } = req.body; // Getting `_id` from request body
    const user = await signup(_id, email, password);
    res.status(201).json({ _id: user._id, email: user.email });
  } catch (error) {
    res.status(400).json({ message: "Signup Successfully" });
  }
});

// Login Route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await login(req.body.email, req.body.password);
    res.status(200).json({ _id: user._id, email: user.email, token: user.token });
  } catch (error) {
    res.status(400).json({ message: "Login Successfully"});
  }
});

export default router;