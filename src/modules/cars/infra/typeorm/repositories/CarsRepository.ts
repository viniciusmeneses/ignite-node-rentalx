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
    name,
    description,
    fine_amount,
    license_plate,
    daily_rate,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      fine_amount,
      license_plate,
      daily_rate,
      brand,
      category_id,
    });

    this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    return this.repository.findOneBy({ license_plate });
  }
}
