import { NextFunction, Request, Response,  } from "express";

import AuthUserService from "../service/Agents/AuthAgentsService";
import { SendRefreshToken } from "../helpers/SendRefreshToken";
import { RefreshTokenService } from "../service/Agents/RefreshTokenService";


export const store = async (req: Request, res: Response, next: NextFunction ): Promise<any> => {
  try {
    const { email, password } = req.body;

    const { accessToken, serializedUser, refreshToken } = await AuthUserService({
      email,
      password
    });

    SendRefreshToken(res, refreshToken);

    if (accessToken === undefined || accessToken === null) {
      return res.status(203).json({
        user: serializedUser
      });
    } else {
      return res.status(200).json({
        accessToken,
        user: serializedUser
      });
    }
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token: string = req.headers.authorization as string;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const { agent, newToken, refreshToken } = await RefreshTokenService(
      res,
      token.replace("Bearer ", "")
    );

    SendRefreshToken(res, refreshToken);

    return res.json({ token: newToken, agent });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  res.clearCookie("jrt");

  return res.send();
};
