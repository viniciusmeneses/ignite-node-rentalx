import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import { IUsersRepository } from "../modules/accounts/repositories/IUsersRepository";

type IPayload = { sub: string };

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("Token missing");

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, process.env.SECRET) as IPayload;

    const usersRepository =
      container.resolve<IUsersRepository>("UsersRepository");

    const user = usersRepository.findById(userId);
    if (!user) throw new Error("User doesn't exists");

    next();
  } catch {
    throw new Error("Invalid token");
  }
};
