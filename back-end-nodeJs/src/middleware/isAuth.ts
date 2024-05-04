import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import authConfig from "../config/auth";
import AppError from "./CustomError";

interface TokenPayload {
  id: string;
  email: string;
  status: string;
  iat: number;
  exp: number;
}

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Sessão expirada", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.secret);
    const { id } = decoded as TokenPayload;
    req.user = {
      id
    };
  } catch (err) {
    throw new AppError(
      "Invalid token. We'll try to assign a new one on next request",
      403
    );
  }

  return next();
};

export default isAuth;
