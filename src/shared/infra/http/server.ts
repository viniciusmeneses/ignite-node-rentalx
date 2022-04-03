import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import "reflect-metadata";
import "express-async-errors";

import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import { router } from "./routes";

import "../../container";

import "../typeorm";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(router);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({ message: err.message });

  return res
    .status(500)
    .json({ message: `Internal server error - ${err.message}` });
});

app.listen(3333, () => console.log("Server started on port 3333"));