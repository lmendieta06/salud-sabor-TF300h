// importacion mongoose nos permite la conexion directa con la base de datos.-> Schema-> plantilla de los productos
import mongoose from "mongoose";
// el mongoose.Schema crea nuestro esquema
const schema = mongoose.Schema;
// definimos de que manera se mostraran los productos

export const userSchema = mongoose.Schema({
 
   nombre:{
      type: String,
     require:true
   },
   correoElectronico:{
      type:String,
      require:true,
      unique:true
   },
   contrasena:{
      type:String,
      require:true
   },
   telefono:{
      type:Number,
      require:true
   },
   direccion:{
      type:String,
      require:true
   },
   imagenPerfil:{
      type: Image
   }

});

export const userModel = mongoose.model("Usuario", userSchema);

// exportacion de variable "userModel" es nuestro modelo creado luego usamos mongoose y model que es un atributo que nos permite usar mongoose y luego entre parentesis el nombre de la coleccion entre "..." y la plantilla que creamos userSchema

