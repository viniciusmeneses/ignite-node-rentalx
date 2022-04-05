import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { dataSource } from "@shared/infra/typeorm";

import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }

  async create({
    id,
    name,
    description,
    fine_amount,
    license_plate,
    daily_rate,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      description,
      fine_amount,
      license_plate,
      daily_rate,
      brand,
      category_id,
      specifications,
    });

    this.repository.save(car);
    return car;
  }

  findById(id: string): Promise<Car> {
    return this.repository.findOneBy({ id });
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    return this.repository.findOneBy({ license_plate });
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    return this.repository.findBy({
      available: true,
      brand,
      category_id,
      name,
    });
  }
}
