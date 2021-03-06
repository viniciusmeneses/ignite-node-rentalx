import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IUpdateCarDTO } from "../dtos/IUpdateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
  create(car: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | null>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  findById(id: string): Promise<Car | null>;
  update(car: IUpdateCarDTO): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
