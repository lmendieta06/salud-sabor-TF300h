import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dishesSchema = new Schema({

    nombrePlato: {
        type: String,
        required: true
    },
    categoriaMenu: {
        type: String,
        enum: ['entradas',  'carnes', 'pastas','ensaladas', 'bebidas', 'platos fuertes', 'postres'],
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
    },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // Relación con Restaurante
});

export const dishesModel = mongoose.model('Dish', dishesSchema);

