import { inject, injectable } from "tsyringe";

import { ISpecificationsRepostiory } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepostiory
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);
    if (specificationAlreadyExists)
      throw new AppError("Specification already exists");

    await this.specificationsRepository.create({ name, description });
  }
}
