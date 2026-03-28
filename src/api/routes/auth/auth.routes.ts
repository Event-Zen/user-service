import { Router } from "express";
import { login, register, me, updateMe } from "../../controllers/auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authMiddleware, me);
authRouter.patch("/me", authMiddleware, updateMe);
