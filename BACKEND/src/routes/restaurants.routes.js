import {Router} from "express";

import { getRestaurantById, getRestaurantByCategory, getRestaurantByCity, getRestaurants, postRestaurant, putRestaurant, deleteRestaurant } from "../controllers/restaurants.controllers.js";
import auth from "../middlewares/auth.js";
export const restaurantRouter = Router();

restaurantRouter.get("/", getRestaurants);
restaurantRouter.get("/:_id", getRestaurantById)
restaurantRouter.get("/category/:categoria", getRestaurantByCategory);
restaurantRouter.get("/city/:ciudad", getRestaurantByCity);
restaurantRouter.post("/", postRestaurant);
restaurantRouter.put("/:_id", putRestaurant);
restaurantRouter.delete("/:_id",deleteRestaurant);