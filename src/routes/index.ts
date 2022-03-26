import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specicationsRoutes } from "./specifications.routes";

const router = Router();
router.use("/categories", categoriesRoutes);
router.use("/specifications", specicationsRoutes);

export { router };
