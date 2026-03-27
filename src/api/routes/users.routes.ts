import { Router } from "express";
import { getAllUsers, updateUserStatus } from "../controllers/user.controller";
import { authMiddleware, adminOnly } from "../middlewares/auth.middleware";

export const usersRouter = Router();

// Admin routes
usersRouter.get("/admin", authMiddleware, adminOnly, getAllUsers);
usersRouter.patch("/admin/:id/status", authMiddleware, adminOnly, updateUserStatus);

usersRouter.get("/", async (_req, res) => {
  res.json([{ id: "1", name: "Demo User" }]);
});