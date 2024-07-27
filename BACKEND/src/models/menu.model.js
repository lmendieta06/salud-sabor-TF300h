import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const menuSchema = new Schema({
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

 export const MenuModel = mongoose.model('Menu', menuSchema);




// categoria: Un campo de tipo String que utiliza enum para limitar los valores a las categorías específicas que mencionaste.

