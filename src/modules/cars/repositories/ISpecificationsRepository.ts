import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

export interface ISpecificationsRepostiory {
  create(specification: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | null>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
