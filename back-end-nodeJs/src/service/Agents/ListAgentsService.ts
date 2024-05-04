import { IAgentes } from "../../interfaces/IAgentes";
import Agents from "../../models/Agents";


interface Request {
  searchParam?: string;
  pageNumber?: string | number;
  perPage: number;
}

interface Response {
  agents: IAgentes[];
  count: number;
  offset: number;
  hasMore: boolean;
  paginateCount: number;
}

const ListAgentsService = async ({ searchParam, pageNumber = "1", perPage = 10 }: Request): Promise<Response> => {
  try {
    const limit = (perPage * 1) as number;
    const off = limit * (+pageNumber - 1);
    const  agents = await Agents.find()
    .skip(off)
    .limit(limit);

    const hasMore = agents.length > off + await Agents.countDocuments();
    const offset = off + 1;
    const paginateCount = Math.ceil(agents.length / limit)
    return {
      agents,
      count: agents.length,
      offset,
      paginateCount,
      hasMore
    };
  } catch (error: any) {
    console.error(error)
    throw new Error(error);
  }

}

export default ListAgentsService;