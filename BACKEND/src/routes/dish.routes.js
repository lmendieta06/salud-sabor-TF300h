import {Router} from "express";

import { getDishById, getDishes, deleteDish, putDish, postDish, getDishByCategory } from "../controllers/dishes.controllers.js";
import auth from "../middlewares/auth.js";
const dishRouter = Router();

dishRouter.get("/", getDishes);

dishRouter.get("/:_id", getDishById);

dishRouter.get("/categoria/:categoriaMenu", getDishByCategory);

dishRouter.post("/", auth("admin"),postDish);

dishRouter.put("/:_id", auth("admin"),putDish);

dishRouter.delete("/:_id", auth("admin"),deleteDish);


export default dishRouter; 