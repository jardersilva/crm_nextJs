import { IAgentes } from "../../interfaces/IAgentes";
import AppError from "../../middleware/CustomError";
import Agents from "../../models/Agents";

interface Response {
  agent: IAgentes;
}

const ShowAgentService = async (id: string): Promise<Response> => {
  
  const agent = await Agents.findById(id);
  if (!agent) {
    throw new AppError("Agent not found", 404)
  }

  return {agent};

}

export default ShowAgentService;