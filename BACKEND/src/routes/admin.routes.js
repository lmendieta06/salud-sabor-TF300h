import { Router } from "express";
import { postAdmin, getAdmin, putAdminById } from "../controllers/admin.controllers.js";

const adminRouter = Router();

//ruta para obtener los administradores
adminRouter.get('/', getAdmin);
// ruta para crear administrador
adminRouter.post('/', postAdmin);
//ruta para actualizar administrador
adminRouter.put('/:id', putAdminById);

export default adminRouter; 