import { Router } from "express";
import loginService from "../services/loginService.js";
import auth from "../middlewares/auth.js";
const loginRouter = Router();

loginRouter.post('/', loginService);

export default loginRouter;