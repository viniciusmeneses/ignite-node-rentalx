import { Repository } from "typeorm";

import { dataSource } from "../../../../database";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  list(): Promise<Category[]> {
    return this.repository.find();
  }

  findByName(name: string): Promise<Category | null> {
    return this.repository.findOne({ where: { name } });
  }
}

export { CategoriesRepository };
