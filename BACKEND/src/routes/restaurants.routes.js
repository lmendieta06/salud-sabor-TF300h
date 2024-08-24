import {Router} from "express";

import { getRestaurantByCategory, getRestaurantByCity, getRestaurants, postRestaurant, putRestaurant, deleteRestaurant } from "../controllers/restaurants.controllers.js";
import auth from "../middlewares/auth.js";
export const restaurantRouter = Router();

restaurantRouter.get("/", getRestaurants);
restaurantRouter.get("/:categoria", getRestaurantByCategory);
restaurantRouter.get("/:ciudad", getRestaurantByCity);
restaurantRouter.post("/",auth("admin"), postRestaurant);
restaurantRouter.put("/:_id",auth("admin"), putRestaurant);
restaurantRouter.delete("/:id",auth("admin"), deleteRestaurant);