import { userModel } from "../models/user.model.js";
import { adminModel } from "../models/admin.models.js";
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/jwt.js';

const loginService = async (req, res) => {
    try {
        // Obtener el email y password del cuerpo de la solicitud
        const { email, password } = req.body;

        // Buscar en la base de datos si existe ese email, primero en la colección de admin y luego en la de user
        let userFound = await adminModel.findOne({ correoElectronico: email });

        if (!userFound) {
            userFound = await userModel.findOne({ correoElectronico: email });
        }

        // Si no se encuentra un usuario con ese email
        if (!userFound) {
            return res.status(404).json({
                estado: '404',
                mensaje: 'Usuario no encontrado, por favor registrarse'
            });
        }

        // Comparar la contraseña ingresada con la guardada en la base de datos
        const validPassword = await bcrypt.compare(password, userFound.contrasena);

        // Si la contraseña no es válida
        if (!validPassword) {
            return res.status(400).json({
                estado: '400',
                mensaje: 'Error al iniciar sesión, contraseña incorrecta'
            });
        }

        // Crear el payload para el token
        const payload = {
            id: userFound._id,
            name: userFound.nombre,
            imagenPerfil: userFound.imagenPerfil, // Asegúrate de incluir esto si es necesario
            role: userFound.role || (userFound.__t === 'Admin' ? 'admin' : 'user'), // Determinar el rol del usuario
            isAdmin: userFound.__t === 'Admin' || userFound.categoriaAdmin // Simplificar la verificación
        };

        // Generar el token
        const token = await generateToken(payload);

        // Si el inicio de sesión es exitoso, devolver el token
        return res.status(200).json({
            estado: '200',
            mensaje: 'Inicio de sesión exitoso',
            tokenGenerado: token
        });

    } catch (error) {
        return res.status(400).json({
            estado: '400',
            mensaje: 'Hubo un error al intentar iniciar sesión',
            error: error.message || error
        });
    }
};

export default loginService;
