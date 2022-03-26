import { parse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(({ name, description }) => {
      const categoryAlreadyExists = this.categoriesRepository.findByName(name);
      if (!categoryAlreadyExists)
        this.categoriesRepository.create({ name, description });
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
      parser.on("end", () => resolve(categories));
      parser.on("error", reject);
    });
  }
}
