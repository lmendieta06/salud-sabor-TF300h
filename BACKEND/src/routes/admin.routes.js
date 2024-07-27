import { Router } from "express";
import { postAdmin, getAdmin, putAdminById } from "../controllers/admin.controllers";
const adminRouter = Router();

adminRouter.get('/', getAdmin);
adminRouter.post('/', postAdmin);
adminRouter.put('/:id', putAdminById);

export default adminRouter;