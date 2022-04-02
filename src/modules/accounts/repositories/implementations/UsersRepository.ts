import { Repository } from "typeorm";

import { dataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
    });

    await this.repository.save(user);
  }

  async update({
    id,
    name,
    password,
    email,
    driver_license,
    is_admin,
    avatar,
  }: IUpdateUserDTO): Promise<void> {
    const user = await this.findById(id);
    this.repository.merge(user, {
      id,
      name,
      password,
      email,
      driver_license,
      is_admin,
      avatar,
    });
    await this.repository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }
}
