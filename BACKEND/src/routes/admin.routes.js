import { Router } from "express";
import { postAdmin, getAdmin, putAdminById } from "../controllers/admin.controllers.js";
import auth from "../middlewares/auth.js";
const adminRouter = Router();

//ruta para obtener los administradores
adminRouter.get('/', auth("admin"), getAdmin);
// ruta para crear administrador
adminRouter.post('/', postAdmin);
//ruta para actualizar administrador
adminRouter.put('/:id',auth("admin"), putAdminById);

export default adminRouter; 