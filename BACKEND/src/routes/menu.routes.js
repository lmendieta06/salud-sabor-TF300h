import express from "express";
import { getMenus, postMenu, updateMenuById, deleteMenuById, getMenuById, getMenuByCategory } from '../controllers/menu.controllers.js';
import auth from "../middlewares/auth.js";
const menuRouter = express.Router();

// Ruta para obtener todos los menus
menuRouter.get('/',auth("admin"), getMenus);

// Ruta para obtener un menu específico por ID
menuRouter.get('/:_id',auth("admin"), getMenuById);

// Ruta para obter menu por categoria
menuRouter.get('/categoria/:categoria',auth("admin"), getMenuByCategory);

// Ruta para crear un nuevo menu
menuRouter.post('/',auth("admin"), postMenu);

// Ruta para actualizar un menu por ID
menuRouter.put('/:_id',auth("admin"), updateMenuById);

// Ruta para eliminar un menu por ID
menuRouter.delete('/:_id',auth("admin"), deleteMenuById);


export default menuRouter;