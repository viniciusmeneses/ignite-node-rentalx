import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
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
    req.user = { id: userId };
    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
};
