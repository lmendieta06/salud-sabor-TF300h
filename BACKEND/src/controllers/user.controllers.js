import { userModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// Crear usuario
export const postUser = async (req, res) => {
  try {
    const { nombre, correoElectronico, contrasena, telefono, direccion } = req.body;
    const imagenPerfil = req.file ? req.file.filename : null; // Obtener el nombre del archivo subido

    const codedPassword = await bcrypt.hash(contrasena, 10);

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
        message: "El correo electrónico ya está en uso"
      });
    }
    return res.status(400).json({
      estado: "400",
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


export const getUserProfile = async (req, res) => {
  try {
    // Obtén el ID del usuario desde el token decodificado
    const userId = req.user.id; // Accediendo al id desde req.user
    console.log('ID del Usuario:', userId);

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