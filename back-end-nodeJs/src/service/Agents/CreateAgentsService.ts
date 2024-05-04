import { IAgentes } from "../../interfaces/IAgentes";
import AppError from "../../middleware/CustomError";
import Agents from "../../models/Agents";

const CreateAgentService = async (data: IAgentes): Promise<IAgentes> => {
  const numberExists = await Agents.findOne({
    email: data.email
  });

  if (numberExists) {
    throw new AppError("Email já cadastrado", 400);
  }
  
  const agent = await Agents.create(data);

  return agent;
}

export default CreateAgentService;