import { IClientes } from "../../interfaces/IClientes";
import Clients from "../../models/Clients";

interface Request {
  status: string;
  agente_id: string;
  data1: string;
  data2: string;
}

const parseDateTime = (dateTimeStr: string): Date => {
  const [datePart, timePart] = dateTimeStr.split(' ');
  const [day, month, year] = datePart.split('/');
  const [hour, minute] = timePart.split(':');
  return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
};

const RelatorioClientsService = async ({ status, agente_id, data1, data2 }: Request): Promise<any> => {
  try {

    const start = parseDateTime(data1+" 00:00");
    const end = parseDateTime(data2+ " 23:59");
    console.log(start, status);
    if (agente_id === "Todos"){
      const clients = await Clients.find({
        status,
        createdAt: {
          $gte: start, 
          $lte: end, 
        },
      }).populate({
        path: 'id_agente',
        select: 'name',
      });
      return clients;
    } else {
      const clients = await Clients.find({
        id_agente: agente_id,
        status,
        createdAt: {
          $gte: start, 
          $lte: end, 
        },
      }).populate({
        path: 'id_agente',
        select: 'name',
      });
      return clients;
    }
  } catch (error: any) {
    console.error('Erro ao listar clientes:', error);
    throw new Error(error.message || 'Erro ao listar clientes.');
  }
};

export default RelatorioClientsService;
