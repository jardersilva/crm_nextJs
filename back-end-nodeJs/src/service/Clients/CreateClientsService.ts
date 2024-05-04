import { IClientes } from "../../interfaces/IClientes";
import AppError from "../../middleware/CustomError";
import Clients from "../../models/Clients";
import findAgentWithLeastClientsInService from "../Agents/FindAgentWithLeastClientsInService";

const CreateClientsService = async (data: IClientes): Promise<IClientes> => {
  const numberExists = await Clients.findOne({
    email: data.email
  });

  if (numberExists) {
    throw new AppError("Email já cadastrado", 400);
  }
  const agentId = await findAgentWithLeastClientsInService();
  
  const client = await Clients.create({
    ...data,
    status: "Aguardando Atendimento",
    id_agente: agentId,
  });

  return client;
}

export default CreateClientsService;