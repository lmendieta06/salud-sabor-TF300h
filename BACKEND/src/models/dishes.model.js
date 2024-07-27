import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dishesSchema = new Schema({

    nombrePlato: {
        type: String,
        required: true
    },
    categoriaMenu: {
        type: String,
        enum: ['entradas', 'ensaladas', 'bebidas', 'platos fuertes', 'postres'],
        required: true
    },
    descripcionPlato: {
        type: String
    },
    imagenPlato: {
        type: String
    },
    precioPlato: {
        type: Number,
        required: true
    }
});

export const dishesModel = mongoose.model('Dish', dishesSchema);

