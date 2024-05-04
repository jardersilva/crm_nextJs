import { IClientes } from "../../interfaces/IClientes";
import AppError from "../../middleware/CustomError";
import Clients from "../../models/Clients";


const UpdateClientsService = async (data: IClientes[], id: string): Promise<IClientes> => {
    const client = await Clients.findByIdAndUpdate(id, {$set: data});

    if (!client) {
      throw new AppError("Cliente não encontrado", 404);
    }

    return client;
}

export default UpdateClientsService;