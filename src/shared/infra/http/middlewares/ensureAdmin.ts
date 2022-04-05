import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

export const ensureAdmin = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  const usersRepository =
    container.resolve<IUsersRepository>("UsersRepository");

  const user = await usersRepository.findById(id);
  if (!user.is_admin) throw new AppError("User is not an admin");

  next();
};
