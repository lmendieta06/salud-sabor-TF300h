import {Router} from "express";
import { getUserById, getUsers, putUser, postUser } from "../controllers/user.controllers.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:_id", getUserById);
usersRouter.post("/", postUser);
usersRouter.put("/:_id", putUser);

export default usersRouter;