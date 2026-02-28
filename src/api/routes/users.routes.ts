import { Router } from "express";

export const usersRouter = Router();


usersRouter.get("/", async (_req, res) => {
  res.json([{ id: "1", name: "Demo User" }]);
});