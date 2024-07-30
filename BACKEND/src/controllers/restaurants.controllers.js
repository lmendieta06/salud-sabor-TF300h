// getRestaurants, getRestaurantsByCategory, getRestaurantsByCity, postRestaurant, putRestaurant, deleteRestaurant

import { restaurantModel } from "../models/restaurants.model.js";

export const postRestaurant = async(req, res) =>{
    return res.status(200).json({
        mensaje : "Se crea restaurante satisfactoriamente"
    })
}

export const getRestaurants = async(req, res) =>{
    return res.status(200).json({
        mensaje : "La peticion get funciona"
    })
}

export const getRestaurantByCategory = async(req, res) =>{
    return res.status(200).json({
        mensaje : "La peticion get por categoria funciona"
    })
}

export const getRestaurantByCity = async(req, res) =>{
    return res.status(200).json({
        mensaje : "La peticion get por ciudad funciona"
    })
}

export const putRestaurant = async(req, res) =>{
    return res.status(200).json({
        mensaje : "La peticion put funciona"
    })
}

export const deleteRestaurant = async(req, res) =>{
    return res.status(200).json({
        mensaje : "La peticion delete funciona"
    })
}
