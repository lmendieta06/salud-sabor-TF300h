import {Router} from "express";

import { getRestaurantByCategory, getRestaurantByCity, getRestaurants, postRestaurant, putRestaurant, deleteRestaurant } from "../controllers/restaurants.controllers.js";
import auth from "../middlewares/auth.js";
export const restaurantRouter = Router();

restaurantRouter.get("/",auth("admin"), getRestaurants);
restaurantRouter.get("/:categoria",auth("admin"), getRestaurantByCategory);
restaurantRouter.get("/:ciudad",auth("admin"), getRestaurantByCity);
restaurantRouter.post("/",auth("admin"), postRestaurant);
restaurantRouter.put("/:_id",auth("admin"), putRestaurant);
restaurantRouter.delete("/:id",auth("admin"), deleteRestaurant);