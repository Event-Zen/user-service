import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";

import { healthRouter } from "./api/routes/health.routes";
import { usersRouter } from "./api/routes/users.routes";
import { errorHandler } from "./api/middlewares/errorHandler";

export function createApp() {
  const app = express();

  app.use(helmet());
   app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    })
  );
  
  app.use(express.json({ limit: "1mb" }));
  app.use(pinoHttp());

  app.use("/health", healthRouter);
  app.use("/api/auth", usersRouter);
  app.use("/api/users", usersRouter);

  app.use(errorHandler);

  return app;
}