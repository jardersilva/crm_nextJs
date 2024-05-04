import { IAgentes } from "../interfaces/IAgentes";

interface SerializedUser {
  name: string;
  email: string;
  status: string;
  id?: string;
}

export const SerializeUser = (user: IAgentes): SerializedUser => {
  return {
    name: user.name,
    email: user.email,
    status: user.status,
    id: user.id
  };
};
