import { verify } from "jsonwebtoken";
import { Response as Res } from "express";

import authConfig from "../../config/auth";
import {
  createAccessToken,
  createRefreshToken
} from "../../helpers/CreateTokens";
import AppError from "../../middleware/CustomError";
import Agents from "../../models/Agents";
import { IAgentes } from "../../interfaces/IAgentes";

interface RefreshTokenPayload {
  id: string;
  tokenVersion: number;
}

interface Response {
  agent: any;
  newToken: string;
  refreshToken: string;
}

export const RefreshTokenService = async (
  res: Res,
  token: string
): Promise<Response> => {
    const decoded = verify(token, authConfig.refreshSecret);
    const { id, tokenVersion } = decoded as RefreshTokenPayload;

    const agent = await await Agents.findById(id);

    if (tokenVersion !== 0) {
      res.clearCookie("jrt");
      throw new AppError("Usuário não encontrado", 401);
    }

    if (agent?.status === "Inativo") {
      res.clearCookie("jrt");
      throw new AppError("Usuário não encontrado", 401);
    }

    const newToken = createAccessToken(agent as IAgentes);
    const refreshToken = createRefreshToken(agent as IAgentes);

    return { agent, newToken, refreshToken };
  
};
