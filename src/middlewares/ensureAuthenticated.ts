import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import { AppError } from "../errors/AppError";
import { IUsersRepository } from "../modules/accounts/repositories/IUsersRepository";

type IPayload = { sub: string };

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, process.env.SECRET) as IPayload;

    const usersRepository =
      container.resolve<IUsersRepository>("UsersRepository");

    const user = usersRepository.findById(userId);
    if (!user) throw new AppError("User doesn't exists", 401);

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
};
