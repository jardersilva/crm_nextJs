import { IClientes } from "../../interfaces/IClientes";
import AppError from "../../middleware/CustomError";
import Clients from "../../models/Clients";

interface Response {
  client: IClientes;
}

const ShowClientsService = async (id: string): Promise<Response> => {
  
  const client = await Clients.findById(id);
  if (!client) {
    throw new AppError("Client not found", 404)
  }

  return {client};

}

export default ShowClientsService;