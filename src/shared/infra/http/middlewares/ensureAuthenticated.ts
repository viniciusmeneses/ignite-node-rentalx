import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { AppError } from "../../../errors/AppError";

type IPayload = { sub: string };

export const ensureAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, process.env.SECRET) as IPayload;

    const usersRepository =
      container.resolve<IUsersRepository>("UsersRepository");

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("User doesn't exists", 401);

    req.user = user;

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
};
