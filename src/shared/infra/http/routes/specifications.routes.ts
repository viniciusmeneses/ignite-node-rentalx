import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

const createSpecificationController = new CreateSpecificationController();
const specicationsRoutes = Router();

specicationsRoutes.post("/", (req, res) =>
  createSpecificationController.handle(req, res)
);

export { specicationsRoutes };
