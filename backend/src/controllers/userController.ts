import { Request, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middlewares/auth";

const getUserData = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

const updateUserName = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

const updateUserPassword = async (req: AuthRequest, res: Response) => {
  const { password } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

export { getUserData, updateUserName, updateUserPassword };
