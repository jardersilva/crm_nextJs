import { Request, Response } from "express";
import { SendRefreshToken } from "../../helpers/SendRefreshToken";
import AuthUserService from "./AuthAgentsService";


export const store = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const { accessToken, serializedUser, refreshToken } = await AuthUserService({
    email,
    password
  });

  SendRefreshToken(res, refreshToken);

  return res.status(200).json({
    accessToken,
    agent: serializedUser
  });
};