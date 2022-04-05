import { In, Repository } from "typeorm";

import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { ISpecificationsRepostiory } from "@modules/cars/repositories/ISpecificationsRepository";
import { dataSource } from "@shared/infra/typeorm";

import { Specification } from "../entities/Specification";

export class SpecificationsRepository implements ISpecificationsRepostiory {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = dataSource.getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    return this.repository.save(specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findBy({ id: In(ids) });
  }

  async findByName(name: string): Promise<Specification | null> {
    return this.repository.findOne({ where: { name } });
  }
}
