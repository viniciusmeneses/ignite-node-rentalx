import { Category } from "../infra/typeorm/entities/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create(category: ICreateCategoryDTO): Promise<void>;
}
