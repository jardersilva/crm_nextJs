import { Router } from "express";
import * as SessionController from "../../controller/SessionController";
import isAuth from "./../../middleware/isAuth";
const jwt = require('jsonwebtoken');


const authRoutes = Router();

authRoutes.post("/login", SessionController.store);

authRoutes.post("/refresh_token", SessionController.update);

authRoutes.delete("/logout", isAuth, SessionController.remove);

export default authRoutes;
