import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

const passwordRoutes = Router();

passwordRoutes.post("/forgot", (req, res) =>
  sendForgotPasswordMailController.execute(req, res)
);
passwordRoutes.post("/reset", (req, res) =>
  resetPasswordUserController.handle(req, res)
);

export { passwordRoutes };
