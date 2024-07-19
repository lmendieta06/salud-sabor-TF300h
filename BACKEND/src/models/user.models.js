// importacion mongoose nos permite la conexion directa con la base de datos.-> Schema-> plantilla de los productos
import mongoose from "mongoose";
// el mongoose.Schema crea nuestro esquema
const schema = mongoose.Schema;
// definimos de que manera se mostraran los productos

export const userSchema = mongoose.Schema({
 
 
 
    nombreCompleto:{
    type: String,
    required : true
 }, 
 
 
 correo:{
    type: String,
    required : true,
    unique:true
 },

 
 
 contraseña:{
    type:String,
    required : true,

 },

 imagen: {

    type: String,
 }



});

export const userModel = mongoose.model("usuario", userSchema);

// exportacion de variable "userModel" es nuestro modelo creado luego usamos mongoose y model que es un atributo que nos permite usar mongoose y luego entre parentesis el nombre de la coleccion entre "..." y la plantilla que creamos userSchema

