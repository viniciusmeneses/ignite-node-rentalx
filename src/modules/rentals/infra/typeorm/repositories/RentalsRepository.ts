import { Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { dataSource } from "@shared/infra/typeorm";

import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = dataSource.getRepository(Rental);
  }

  findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.repository.findOneBy({ car_id });
  }

  findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.repository.findOneBy({ user_id });
  }

  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return this.repository.save(rental);
  }
}
