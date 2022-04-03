import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateUserController = new AuthenticateUserController();
const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", (req, res) =>
  authenticateUserController.handle(req, res)
);

export { authenticateRoutes };
