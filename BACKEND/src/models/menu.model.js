import mongoose from 'mongoose';
import { dishesModel } from './dishes.model';

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    imagenRestaurant:{
        type:String,
        required:true
    },
    nameRestaurant:{
        type:String,
        required:true
    },
    category:[{
        type:String,
        required:true
    }],
    dishes:[{
        type:Schema.Type.ObjectId, 
        ref:"Dish"
    }]
});

export const menuModel = mongoose.model('Menu', menuSchema);




// categoria: Un campo de tipo String que utiliza enum para limitar los valores a las categorías específicas que mencionaste.

