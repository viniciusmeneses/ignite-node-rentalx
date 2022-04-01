import dotenv from "dotenv";
import express from "express";
import swaggerUI from "swagger-ui-express";
import "reflect-metadata";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./shared/container";

import "./database";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(router);

app.listen(3333, () => console.log("Server started on port 3333"));
