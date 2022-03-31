import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specicationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();
router.use("/categories", categoriesRoutes);
router.use("/specifications", specicationsRoutes);
router.use("/users", usersRoutes);

export { router };
