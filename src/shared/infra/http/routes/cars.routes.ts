import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import {
  ListAvailableCarsController,
  Request,
} from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listAvailableCarsController = new ListAvailableCarsController();
const carsRoutes = Router();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, (req, res) =>
  createCarController.handle(req, res)
);

carsRoutes.post(
  "/:id/specifications",
  ensureAuthenticated,
  ensureAdmin,
  (req, res) => createCarSpecificationController.handle(req, res)
);

carsRoutes.get("/available", (req: Request, res) =>
  listAvailableCarsController.handle(req, res)
);

export { carsRoutes };
