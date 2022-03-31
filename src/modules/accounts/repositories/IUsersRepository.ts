import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>;
}
