import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();
import "./database";
import router from "./routes";
import AppError from "./app/errors/AppError";

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

export default app;
