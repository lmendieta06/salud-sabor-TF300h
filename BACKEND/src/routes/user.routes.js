import { Router } from 'express';
import { getUserById, getUsers, putUser, postUser, getUserProfile } from '../controllers/user.controllers.js';
import auth from '../middlewares/auth.js';
import upload from '../../config/multerConfig.js';

const usersRouter = Router();

// Rutas para manejar usuarios con autenticación adecuada y manejo de archivos

usersRouter.get('/profile', auth('user'), getUserProfile); // Nueva ruta para obtener el perfil del usuario
usersRouter.put('/:_id', upload.single('imagenPerfil'), putUser);
usersRouter.get('/', auth('admin'), getUsers);
usersRouter.get('/:_id', auth('admin'), getUserById);

usersRouter.post('/', upload.single('imagenPerfil'), postUser); // Manejo de archivo en postUser


export default usersRouter;