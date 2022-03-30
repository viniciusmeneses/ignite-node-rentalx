import { Specification } from "../entities/Specification";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepostiory {
  create(specification: ICreateSpecificationDTO): void;
  findByName(name: string): Specification | undefined;
}
