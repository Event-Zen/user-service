import { Request, Response } from "express";
import { User } from "../models/user.model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select("-passwordHash");
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["ACTIVE", "SUSPENDED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(id, { status }, { new: true }).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
