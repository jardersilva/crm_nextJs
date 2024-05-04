import { NextFunction, Request, Response } from "express";
import CreateClientsService from "../service/Clients/CreateClientsService";
import DeleteClientsService from "../service/Clients/DeleteClientsService";
import ListClientsService from "../service/Clients/ListClientsService";
import ShowClientsService from "../service/Clients/ShowClientsService";
import UpdateClientsService from "../service/Clients/UpdateClientsService";
import RelatorioClientsService from "../service/Clients/RelatorioClientsService";

type IndexQuery = {
  searchParam: string;
  pageNumber: string;
  perPage: number;
  paginateCount: number;
  offset: number;
};

type IndexQueryRelatorio = {
  status: string;
  agente_id: string;
  data1: string;
  data2: string;
};

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try{

    const { searchParam, pageNumber, perPage, } = req.query as unknown as IndexQuery;

    const { clients, count, hasMore, offset, paginateCount } = await ListClientsService({
      searchParam,
      pageNumber,
      perPage
    });

    return res.json({ clients, count, hasMore, offset, paginateCount });
  } catch (error) {
    next(error);
  }
}

export const relatorio = async (req: Request, res: Response, next: NextFunction) => {
  try{

    const { status, agente_id, data1, data2} = req.query as unknown as IndexQueryRelatorio;

    const clients = await RelatorioClientsService({status, agente_id, data1, data2});

    return res.json( clients );
  } catch (error) {
    next(error);
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;

    const { client } = await ShowClientsService(id);
    return res.json(client);
  } catch (error) {
    next(error);
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;

    await DeleteClientsService(id);

    return res.status(204).json({ message: "Client deleted" });
  } catch (error) {
    next(error);
  }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const agent = await CreateClientsService(data);

    return res.status(201).json(agent);
  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const users = await UpdateClientsService(data, id);

    return res.status(202).json(users);
  } catch (error) {
    next(error);
  }
}