import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCarController = new CreateCarController();
const carsRoutes = Router();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, (req, res) =>
  createCarController.handle(req, res)
);

export { carsRoutes };
