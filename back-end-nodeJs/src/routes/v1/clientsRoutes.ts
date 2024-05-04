import express from "express";
import * as ClientsController from "../../controller/ClientsController";
import isAuth from "../../middleware/isAuth";


const clientsControllerRoutes = express.Router();

clientsControllerRoutes.get("/clients", isAuth, ClientsController.index);
clientsControllerRoutes.get("/clients/:id", isAuth, ClientsController.show);
clientsControllerRoutes.delete("/clients/:id", isAuth, ClientsController.remove);
clientsControllerRoutes.post("/clients", isAuth, ClientsController.create);
clientsControllerRoutes.put("/clients/:id", isAuth, ClientsController.update);
clientsControllerRoutes.get("/relatorio/clients", isAuth, ClientsController.relatorio);

export default clientsControllerRoutes;