import {Router} from "express";

import { getDishById, getDishes, deleteDish, putDish, postDish, getDishByCategory } from "../controllers/dishes.controllers.js";

export const dishRouter = Router();

dishRouter.get("/", getDishes);

dishRouter.get("/:_id", getDishById);

dishRouter.get("/categoria/:categoriaMenu", getDishByCategory);

dishRouter.post("/", postDish);

dishRouter.put("/:_id", putDish);

dishRouter.delete("/:_id", deleteDish);