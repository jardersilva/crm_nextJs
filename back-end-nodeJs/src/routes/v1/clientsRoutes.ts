import express from "express";
import * as ClientsController from "../../controller/ClientsController";
import isAuth from "../../middleware/isAuth";


const clientsControllerRoutes = express.Router();

clientsControllerRoutes.get("/clients", ClientsController.index);
clientsControllerRoutes.get("/clients/:id",  ClientsController.show);
clientsControllerRoutes.delete("/clients/:id",  ClientsController.remove);
clientsControllerRoutes.post("/clients",  ClientsController.create);
clientsControllerRoutes.put("/clients/:id",  ClientsController.update);
clientsControllerRoutes.get("/relatorio/clients",  ClientsController.relatorio);

export default clientsControllerRoutes;