import mongoose, {Schema} from "mongoose";
import { dishesModel } from "./dishes.model";

const menuSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imgLogo:{
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
})


export const menuModel = mongoose.model("Menu", menuSchema);



