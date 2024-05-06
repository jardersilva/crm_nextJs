import express from "express";
import * as AgentController from "../../controller/AgentController";
import isAuth from "../../middleware/isAuth";


const agentControllerRoutes = express.Router();

agentControllerRoutes.get("/agents",  AgentController.index);
agentControllerRoutes.get("/agents/:id",  AgentController.show);
agentControllerRoutes.delete("/agents/:id",  AgentController.remove);
agentControllerRoutes.post("/agents",  AgentController.create);
agentControllerRoutes.put("/agents/:id",  AgentController.update);

export default agentControllerRoutes;