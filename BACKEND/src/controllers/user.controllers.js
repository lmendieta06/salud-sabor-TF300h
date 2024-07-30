// getUsers, postUser, putUser, deleteUser (tentativa), getUserById
import { userModel } from "../models/user.model.js";

export const postUser = async(req, res) =>{
    return res.status(200).json({
        mensaje : "Se crea usuario satisfactoriamente"
    })
}

export const getUsers = async(req, res) =>{
    return res.status(200).json({
        mensaje : "Se encuentran todos los usuarios satisfactoriamente"
    })
}

export const putUser = async(req, res) =>{
    return res.status(200).json({
        mensaje : "Se actualiza usuario satisfactoriamente"
    })
}

export const getUserById = async(req, res) =>{
    return res.status(200).json({
        mensaje : "Se encuentra usuario satisfactoriamente"
    })
}