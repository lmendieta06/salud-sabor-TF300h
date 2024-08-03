import {Router} from "express";

import { getRestaurantByCategory, getRestaurantByCity, getRestaurants, postRestaurant, putRestaurant, deleteRestaurant } from "../controllers/restaurants.controllers.js";

export const restaurantRouter = Router();

restaurantRouter.get("/", getRestaurants);
restaurantRouter.get("/:categoria", getRestaurantByCategory);
restaurantRouter.get("/ciudad/:ciudad", getRestaurantByCity);
restaurantRouter.post("/", postRestaurant);
restaurantRouter.put("/:_id", putRestaurant);
restaurantRouter.delete("/:_id", deleteRestaurant);