// importacion mongoose nos permite la conexion directa con la base de datos.-> Schema-> plantilla de los productos
import mongoose from "mongoose";

// definimos de que manera se mostraran los productos

const userSchema = new mongoose.Schema({
   nombre: {
       type: String,
       required: true
   },
   correoElectronico: {
       type: String,
       required: true,
       unique: true
   },
   contrasena: {
       type: String,
       required: true
   },
   telefono: {
       type: Number,
       required: true
   },
   direccion: {
       type: String,
       required: true
   },
   imagenPerfil: {
       type: String
   },
   resetPasswordToken: { type: String }, // Token de recuperación de contraseña
   resetPasswordExpires: { type: Date }, // Expiración del token
});

export const userModel = mongoose.model("Usuario", userSchema);

// exportacion de variable "userModel" es nuestro modelo creado luego usamos mongoose y model que es un atributo que nos permite usar mongoose y luego entre parentesis el nombre de la coleccion entre "..." y la plantilla que creamos userSchema

