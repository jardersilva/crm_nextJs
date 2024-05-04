
import AppError from "../../middleware/CustomError";
import Clients from "../../models/Clients";


const DeleteClientsService = async (id: string | number): Promise<void> => {
    const client = await Clients.findById(id);

    if (!client) {
      throw new AppError("Cliente não encontrado", 404 );
    }

    await client.deleteOne();
};

export default DeleteClientsService;
