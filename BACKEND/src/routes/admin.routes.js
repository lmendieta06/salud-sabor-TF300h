import { Router } from "express";
import { postAdmin, getAdmin, putAdminById, deleteAdmin } from "../controllers/admin.controllers.js";
import auth from "../middlewares/auth.js";
const adminRouter = Router();

//ruta para obtener los administradores
adminRouter.get('/', getAdmin);
// ruta para crear administrador
adminRouter.post('/', postAdmin);
//ruta para actualizar administrador
adminRouter.put('/:id',auth("admin"), putAdminById);
// ruta para eliminar administrador
adminRouter.delete("/:id", deleteAdmin);

export default adminRouter; 