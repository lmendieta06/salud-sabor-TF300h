import { userModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto'; // Para generar un token seguro

// Crear usuario
export const postUser = async (req, res) => {
  try {
    const { nombre, correoElectronico, contrasena, telefono, direccion } = req.body;
    const imagenPerfil = req.file ? `http://localhost:2000/uploads/${req.file.filename}` : null; // Obtener la ruta del archivo subido

    // Validar la longitud de la contraseña
    if (contrasena.length < 6) {
      return res.status(400).json({
        estado: "400",
        message: "La contraseña debe tener al menos 6 caracteres."
      });
    }

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await userModel.findOne({ correoElectronico });
    if (existingUser) {
      return res.status(400).json({
        estado: "400",
        message: "El correo electrónico ya está en uso."
      });
    }

    // Encriptar la contraseña
    const codedPassword = await bcrypt.hash(contrasena, 10);

    // Crear nuevo usuario
    const newUser = await userModel.create({
      nombre,
      correoElectronico,
      contrasena: codedPassword,
      telefono,
      direccion,
      imagenPerfil
    });

    return res.status(201).json({
      estado: "201",
      mensaje: "Usuario creado correctamente",
      datos: newUser
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        estado: "400",
        message: "El correo electrónico ya está en uso."
      });
    }
    return res.status(500).json({
      estado: "500",
      message: "No se logró crear el usuario: " + error.message
    });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    let users = await userModel.find();
    if (users.length === 0) {
      return res.status(200).json({ message: "No se encontraron usuarios registrados" });
    }
    return res.status(200).json({
      estado: 200,
      mensaje: "Se encontraron todos los usuarios",
      cantidad: users.length,
      users
    });
  } catch (error) {
    return res.status(404).json({
      message: "Hubo un error al hacer la petición: " + error.message
    });
  }
};

// Actualizar usuario
export const putUser = async (req, res) => {
  try {
    let idUpdate = req.params._id;
    const dataForUpdate = req.body;
    const file = req.file;

    if (file) {
      dataForUpdate.imagenPerfil = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`; // Actualiza la URL de la imagen
    }

    let userUpdate = await userModel.findByIdAndUpdate(idUpdate, dataForUpdate, { new: true });

    if (!userUpdate) {
      return res.status(404).json({
        estado: 404,
        mensaje: "No se encontró el usuario para actualizar"
      });
    }

    return res.status(200).json({
      estado: 200,
      mensaje: "Se actualizó correctamente el usuario",
      dato: userUpdate
    });
  } catch (error) {
    return res.status(404).json({
      message: "No se pudo realizar la petición: " + error.message
    });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    let idUser = req.params._id;

    if (idUser.length !== 24) {
      return res.status(400).json({
        estado: 400,
        mensaje: "Se debe ingresar un ID válido"
      });
    }

    let user = await userModel.findById(idUser);

    if (!user) {
      return res.status(404).json({
        estado: 404,
        mensaje: "No se encontró el usuario que necesita"
      });
    }

    return res.status(200).json({
      estado: 200,
      mensaje: "Se encontró el siguiente usuario",
      usuario: user
    });
  } catch (error) {
    return res.status(404).json({
      message: "No se pudo realizar la petición: " + error.message
    });
  }
};

// Obtener perfil de usuario
export const getUserProfile = async (req, res) => {
  try {
    // Obtén el ID del usuario desde el token decodificado
    const userId = req.user.id; // Accediendo al id desde req.user

    // Busca al usuario en la base de datos
    const user = await userModel.findById(userId).select('-contrasena');  // Usa await aquí y excluye la contraseña

    // Si el usuario no se encuentra, devuelve un error 404
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Si todo está bien, devuelve el perfil del usuario
    res.json(user);
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error); // Imprime el error completo en la consola

    // Devuelve un error 500 con detalles del error
    res.status(500).json({ 
      message: 'Error al obtener el perfil del usuario',
      error: error.message || error // Incluye el mensaje de error en la respuesta
    });
  }
};



//recuperacion de contraseña 
export const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar si el correo electrónico existe en la base de datos
    const user = await userModel.findOne({ correoElectronico: email });
    if (!user) {
      return res.status(404).json({
        estado: "404",
        message: "Correo electrónico no encontrado"
      });
    }

    // Generar un token de recuperación
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = Date.now() + 3600000; // 1 hora

    // Guardar el token y su fecha de expiración en la base de datos del usuario
    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiration;
    await user.save();

    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Usa las variables de entorno para las credenciales
        pass: process.env.EMAIL_PASS
        
      }
      
    });
 
    // Configurar las opciones del correo
    const mailOptions = {
      from: process.env.EMAIL_USER, // Usa el correo del remitente desde las variables de entorno
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Haga clic en el siguiente enlace para restablecer su contraseña: http://localhost:4200/reset-password/${token}`
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).json({
          estado: "500",
          message: 'Error al enviar el correo',
          error: error.message
        });
      }
      res.status(200).json({
        estado: "200",
        message: 'Correo enviado',
        info
      });
    });

  } catch (error) {
    console.error('Error en la recuperación de contraseña:', error);
    return res.status(500).json({
      estado: "500",
      message: "Error en la recuperación de contraseña",
      error: error.message
    });
  }
};