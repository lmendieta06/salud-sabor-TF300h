import { userModel } from "../models/user.model.js";
import { adminModel } from "../models/admin.models.js";
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/jwt.js';


const loginService = async (req, res) => {

    try {
        //email y password son los inputs de el login del proyecto
        const { email, password } = req.body;
        // buscar en la base de datos si existe ese email tanto en la coleccion de admin como la de user


        // Buscar en el modelo de administrador
        let userFound = await adminModel.findOne({ correoElectronico: email });

        // Si no se encontró en el modelo de administrador, buscar en el modelo de usuario
        if (!userFound) {
            userFound = await userModel.findOne({ correoElectronico: email });
        }
        // si no hay usuarios con ese email
        if (!userFound) {
            return res.status(404).json({
                estado: '404',
                mensaje: 'Usuario no encontrado, por favor registrarse'
            })
        }


        // comparamos password con la contraseña guardada en la base de datos
        // comparamos 1. la contraseña que ingresa y 2. la contraseña guardada en la base de datos
        const validPassword = await bcrypt.compare(password, userFound.contrasena);

        // validar si la contraseña en correcta
        if (!validPassword) {
            return res.status(400).json({
                estado: '400',
                mensaje: 'Error al iniciar sesión, contraseña incorrecta'
            });
        }
        // ---------------------------- AUTENTICACIÓN-------------------------------------//
        // ---------------------------- AUTENTICACIÓN-------------------------------------//
        // ---------------------------- AUTENTICACIÓN-------------------------------------//

        // payload -> info user para crear el token
        //  mi usuario encontrado lo guardo en userFound

        const payload = {
            id: userFound._id,
            name: userFound.nombre,
            imagenPerfil: userFound.imagenPerfil, // Asegúrate de incluir esto si es necesario
            isAdmin: userFound.__t === 'Admin' || userFound.categoriaAdmin // Simplifica la verificación
        }


        // GENERAR NUESTRO TOKEN
        const token = await generateToken(payload);

        // Si se inicií sesión correctamente, con credendiales correctas y se creó un token
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

}

export default loginService;