//importacion de dependencias

import mongoose from "mongoose";

export const connexionMongo = async () =>{
    // conecxion base de DATOS
        await mongoose.connect(process.env.CONEXION_DB,{})
    
    // control de errores -> bloque try - catch
    try{
    
        console.log("Conexion exitosa con la base de datos");
    }catch(error){
        console.error("error de conexion:", error.mensage)
    }
    }