import { Router } from "express";
import loginService from "../services/loginService.js";

const loginRouter = Router();

loginRouter.post('/', loginService);

export default loginRouter;