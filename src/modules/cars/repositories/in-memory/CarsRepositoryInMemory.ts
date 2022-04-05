import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    license_plate,
    fine_amount,
    description,
    daily_rate,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      brand,
      category_id,
    });

    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (!car.available) return null;
      if (brand && brand !== car.brand) return null;
      if (category_id && category_id !== car.category_id) return null;
      if (name && name !== car.name) return null;
      return car;
    });
  }
}
