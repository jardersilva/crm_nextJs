import { Router } from "express";
import AgentControllerRoutes from "./agentsRoutes";
import AuthRoutes from "./authRoutes";
import clientsRouters from "./clientsRoutes";

const routes = Router();

routes.use(AgentControllerRoutes);
routes.use(AuthRoutes);
routes.use(clientsRouters);


export default routes;