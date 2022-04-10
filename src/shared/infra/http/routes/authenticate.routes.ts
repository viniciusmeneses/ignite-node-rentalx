import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", (req, res) =>
  authenticateUserController.handle(req, res)
);
authenticateRoutes.post("/refresh-token", (req, res) =>
  refreshTokenController.handle(req, res)
);

export { authenticateRoutes };
