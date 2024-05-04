
import AppError from "../../middleware/CustomError";
import Agents from "../../models/Agents";


const DeleteAgentService = async (id: string | number): Promise<void> => {
    const agent = await Agents.findById(id);

    if (!agent) {
      throw new AppError("Usuário não encontrado", 404 );
    }

    if (agent.email === "admin@admin.com") {
      throw new AppError("Agente não pode ser manipulado", 400);
    }

    await agent.deleteOne();
};

export default DeleteAgentService;
