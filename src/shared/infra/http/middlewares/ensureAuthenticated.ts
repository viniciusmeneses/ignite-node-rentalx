import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

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
    const { sub: userId } = verify(token, auth.secret_token) as IPayload;

    const usersTokensRepository = container.resolve<IUsersTokensRepository>(
      "UsersTokensRepository"
    );

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      userId,
      token
    );
    if (!user) throw new AppError("User doesn't exists", 401);

    req.user = user;

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
};
