import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecificationUsecase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarSpecificationUsecase.execute({
      car_id: id,
      specifications_id,
    });

    return res.json(car);
  }
}
