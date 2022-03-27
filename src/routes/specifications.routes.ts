import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specicationsRoutes = Router();

specicationsRoutes.post("/", (req, res) =>
  createSpecificationController.handle(req, res)
);

export { specicationsRoutes };
