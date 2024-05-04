import { IClientes } from "../../interfaces/IClientes";
import Clients from "../../models/Clients";

interface Request {
  searchParam?: string;
  pageNumber?: string | number;
  perPage: number;
}

interface ClientWithAgent {
  client: IClientes;
  agentName: string;
}

interface Response {
  clients: ClientWithAgent[];
  count: number;
  offset: number;
  hasMore: boolean;
  paginateCount: number;
}

const ListClientsService = async ({ searchParam, pageNumber = "1", perPage = 10 }: Request): Promise<Response> => {
  try {
    const limit = (perPage * 1) as number;
    const offset = limit * (+pageNumber - 1);

    const clients = await Clients.find()
      .populate({
        path: 'id_agente',
        select: 'name',
      })
      .skip(offset)
      .limit(limit);

    const totalDocuments = await Clients.countDocuments(); // Número total de clientes
    const hasMore = offset + limit < totalDocuments; // Determina se há mais clientes além do limite atual
    const paginateCount = Math.ceil(totalDocuments / limit); // Número total de páginas para paginação

    // Adiciona o nome do agente associado ao resultado
    const clientsWithAgent = clients.map(client => ({
      client,
      agentName: client.id_agente?.name || 'Desconhecido', // Se não houver agente associado, retorna "Desconhecido"
    }));

    return {
      clients: clientsWithAgent,
      count: clients.length,
      offset: offset + 1,
      paginateCount,
      hasMore,
    };
  } catch (error: any) {
    console.error('Erro ao listar clientes:', error);
    throw new Error(error.message || 'Erro ao listar clientes.');
  }
};

export default ListClientsService;
