import { Router } from 'express';
import { getUserById, getUsers, putUser, postUser } from '../controllers/user.controllers.js';
import auth from '../middlewares/auth.js';
import upload from '../../config/multerConfig.js';

const usersRouter = Router();

// Rutas para manejar usuarios con autenticación adecuada y manejo de archivos
usersRouter.get('/', auth('admin'), getUsers);
usersRouter.get('/:_id', auth('admin'), getUserById);
usersRouter.post('/', upload.single('imagenPerfil'), postUser); // Manejo de archivo en postUser
usersRouter.put('/:_id', putUser);

export default usersRouter;