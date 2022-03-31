import { inject, injectable } from "tsyringe";

import { ISpecificationsRepostiory } from "../../repositories/ISpecificationsRepository";

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

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);
    if (specificationAlreadyExists)
      throw new Error("Specification already exists");

    this.specificationsRepository.create({ name, description });
  }
}
