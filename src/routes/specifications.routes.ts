import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specicationsRoutes = Router();

const specicationsRepository = new SpecificationsRepository();

specicationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(
    specicationsRepository
  );

  createSpecificationService.execute({ name, description });
  return res.sendStatus(201);
});

export { specicationsRoutes };
