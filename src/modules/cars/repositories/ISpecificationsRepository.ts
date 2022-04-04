import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

export interface ISpecificationsRepostiory {
  create(specification: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification | null>;
}
