import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specicationsRoutes = Router();

specicationsRoutes.post("/", createSpecificationController.handle);

export { specicationsRoutes };
