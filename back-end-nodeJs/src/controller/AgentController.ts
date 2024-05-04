import { NextFunction, Request, Response } from "express";
import CreateAgentsService from "../service/Agents/CreateAgentsService";
import DeleteAgentsService from "../service/Agents/DeleteAgentsService";
import ListAgentsService from "../service/Agents/ListAgentsService";
import ShowAgentService from "../service/Agents/ShowAgentsService";
import UpdateAgentService from "../service/Agents/UpdateAgentsService";

type IndexQuery = {
  searchParam: string;
  pageNumber: string;
  perPage: number;
  paginateCount: number;
  offset: number;
};

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try{

    const { searchParam, pageNumber, perPage, } = req.query as unknown as IndexQuery;

    const { agents, count, hasMore, offset, paginateCount } = await ListAgentsService({
      searchParam,
      pageNumber,
      perPage
    });

    return res.json({ agents, count, hasMore, offset, paginateCount });
  } catch (error) {
    next(error);
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;

    const { agent } = await ShowAgentService(id);
    return res.json(agent);
  } catch (error) {
    next(error);
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;

    await DeleteAgentsService(id);

    return res.status(204).json({ message: "Agents deleted" });
  } catch (error) {
    next(error);
  }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const agent = await CreateAgentsService(data);

    return res.status(201).json(agent);
  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const users = await UpdateAgentService(data, id);

    return res.status(202).json(users);
  } catch (error) {
    next(error);
  }
}