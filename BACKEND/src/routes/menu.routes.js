import express from "express";


import { getMenus, postMenu, updateMenuById, deleteMenuById, getMenuById, getMenuByCategory } from '../controllers/menu.controllers.js';

const menuRouter = express.Router();

// Ruta para obtener todos los menus
menuRouter.get('/menus', getMenus);

// Ruta para obtener un menu específico por ID
menuRouter.get('/menus/:_id', getMenuById);

// Ruta para obter menu por categoria
menuRouter.get('/menus/:categoria', getMenuByCategory);

// Ruta para crear un nuevo menu
menuRouter.post('/menus', postMenu);

// Ruta para actualizar un menu por ID
menuRouter.put('/menus/:_id', updateMenuById);

// Ruta para eliminar un menu por ID
menuRouter.delete('/menus/:_id', deleteMenuById);


export default menuRouter;