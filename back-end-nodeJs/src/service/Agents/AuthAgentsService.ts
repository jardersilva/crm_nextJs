import {
  createAccessToken,
  createRefreshToken
} from "../../helpers/CreateTokens";
import { SerializeUser } from "../../helpers/SerializeUser";
import AppError from "../../middleware/CustomError";
import Agents from "../../models/Agents";

interface Request {
  email: string;
  password: string;
}

interface Response {
  serializedUser: any;
  accessToken?: string;
  refreshToken?: string;
}

const AuthUserService = async ({
  email,
  password
}: Request): Promise<Response> => {
    const user = await Agents.findOne({
      $or: [{ email: email }]
    }).exec();

    if(!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
  
    if (!(await user.validatePassword(password))) {
      throw new AppError("Usuário ou senha inválidas", 401);
    }

    if(user.status === "Inativo") {
      throw new AppError("Acesso negado", 401);
    }
  
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
  
    const serializedUser = SerializeUser(user);
  
    return {
      serializedUser,
      accessToken,
      refreshToken
    };
};

export default AuthUserService;
