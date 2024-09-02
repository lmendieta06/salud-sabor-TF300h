import { Router } from "express";
import { postAdmin, getAdmin, putAdminById, deleteAdmin } from "../controllers/admin.controllers.js";
import auth from "../middlewares/auth.js";
const adminRouter = Router();

//ruta para obtener los administradores
adminRouter.get('/',auth("admin"), getAdmin);
// ruta para crear administrador
adminRouter.post('/',auth("admin"), postAdmin);
//ruta para actualizar administrador
adminRouter.put('/:id',auth("admin"), putAdminById);
// ruta para eliminar administrador
adminRouter.delete("/:id",auth("admin"), deleteAdmin);

export default adminRouter; 