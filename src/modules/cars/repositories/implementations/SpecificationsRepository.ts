import { Repository } from "typeorm";

import { dataSource } from "../../../../database";
import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepostiory,
} from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepostiory {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = dataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.repository.findOne({ where: { name } });
  }
}
