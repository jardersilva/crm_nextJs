import express from "express";
import * as AgentController from "../../controller/AgentController";
import isAuth from "../../middleware/isAuth";


const agentControllerRoutes = express.Router();

agentControllerRoutes.get("/agents", isAuth, AgentController.index);
agentControllerRoutes.get("/agents/:id", isAuth, AgentController.show);
agentControllerRoutes.delete("/agents/:id", isAuth, AgentController.remove);
agentControllerRoutes.post("/agents", isAuth, AgentController.create);
agentControllerRoutes.put("/agents/:id", isAuth, AgentController.update);

export default agentControllerRoutes;