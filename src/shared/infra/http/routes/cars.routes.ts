import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import {
  ListAvailableCarsController,
  Request,
} from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const uploadImages = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listAvailableCarsController = new ListAvailableCarsController();
const uploadCarImagesController = new UploadCarImagesController();
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

carsRoutes.post(
  "/:id/images",
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array("images"),
  (req, res) => uploadCarImagesController.handle(req, res)
);

carsRoutes.get("/available", (req: Request, res) =>
  listAvailableCarsController.handle(req, res)
);

export { carsRoutes };
