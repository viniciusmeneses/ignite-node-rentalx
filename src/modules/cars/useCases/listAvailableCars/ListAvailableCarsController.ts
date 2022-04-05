import { Request as ExpressRequest, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

interface IRequestQuery {
  brand: string;
  name: string;
  category_id: string;
}

export type Request = ExpressRequest<unknown, unknown, unknown, IRequestQuery>;

export class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query;
    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      brand,
      name,
      category_id,
    });

    return res.json(cars);
  }
}
