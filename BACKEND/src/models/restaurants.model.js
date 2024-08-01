// Importaciones
import mongoose, {Schema} from "mongoose";
import { menuModel } from "./menu.model.js";


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
    correoElectronico:{
        type: String,
        required: true,
        unique: true
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
      // Aquí se establece la referencia al modelo Menu
    menu:{
        type: Schema.Types.ObjectId,
        ref:"Menu",
    },
    logo:{
        type:String
    }
})

export const restaurantModel = mongoose.model("Restaurante", restaurantSchema);