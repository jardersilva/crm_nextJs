import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import User from "../models/Agents";
import { IAgentes } from "../interfaces/IAgentes";

export const createAccessToken = (user: IAgentes): string => {
  const { secret, expiresIn } = authConfig;

  return sign(
    {
      name: user.name,
      email: user.email,
      status: user.status,
      id: user.id
    },
    secret,
    {
      expiresIn
    }
  );
};

export const createRefreshToken = (user: IAgentes): string => {
  const { refreshSecret, refreshExpiresIn } = authConfig;

  return sign({
      name: user.name,
      email: user.email,
      status: user.status,
      id: user.id
  }, refreshSecret, {
    expiresIn: refreshExpiresIn
  });
};
