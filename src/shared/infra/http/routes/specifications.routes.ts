import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createSpecificationController = new CreateSpecificationController();
const specicationsRoutes = Router();

specicationsRoutes.post("/", ensureAuthenticated, ensureAdmin, (req, res) =>
  createSpecificationController.handle(req, res)
);

export { specicationsRoutes };
