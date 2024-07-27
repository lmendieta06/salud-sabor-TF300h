import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dishesSchema = new Schema({
    categoriaMenu: {
        type: String,
        enum: ['entradas', 'ensaladas', 'bebidas', 'platos fuertes', 'postres'],
        required: true
    },
    nombrePlato: {
        type: String,
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

export const Model = mongoose.model('Menu', menuSchema);

