import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(async ({ name, description }) => {
      const categoryAlreadyExists = await this.categoriesRepository.findByName(
        name
      );
      if (!categoryAlreadyExists)
        await this.categoriesRepository.create({ name, description });
    });
  }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise<IImportCategory[]>((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const parser = parse();
      const stream = fs.createReadStream(file.path);

      stream.pipe(parser);

      parser.on("data", ([name, description]) =>
        categories.push({ name, description })
      );
      parser.on("end", () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      });
      parser.on("error", reject);
    });
  }
}
