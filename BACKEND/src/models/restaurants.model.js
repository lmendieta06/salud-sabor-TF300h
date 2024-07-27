// Importaciones
import mongoose from "mongoose";

// Crear schema
const schema = mongoose.Schema;

const restaurantSchema = new schema({

    nombre:{
        type:String,
        require:true
    },
    ciudad:{
        type:String,
        require:true
    },
    categoria:{
        type:String,
        require:true
    },
    descripcion:{
        type:String
    },
    direccion:{
        type:String,
        require:true
    },
    menu:{
    },
    logo:{
        type:Image
    }
})

export const restaurantModel = mongoose.model("Restaurante", restaurantModel);