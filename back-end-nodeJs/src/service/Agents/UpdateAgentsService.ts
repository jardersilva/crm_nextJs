import { IAgentes } from "../../interfaces/IAgentes";
import AppError from "../../middleware/CustomError";
import Agents from "../../models/Agents";


const UpdateAgentsService = async (data: IAgentes[], id: string): Promise<IAgentes> => {
    const agents = await Agents.findByIdAndUpdate(id, {$set: data});

    if (!agents) {
      throw new AppError("Agente não encontrado", 404);
    }

    if (agents.email === "admin@admin.com") {
      throw new AppError("Agente não pode ser manipulado", 400);
    }
  
    return agents;
}

export default UpdateAgentsService;