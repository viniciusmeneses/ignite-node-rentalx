import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, password, email, driver_license } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);
    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license,
    });

    return res.sendStatus(201);
  }
}
