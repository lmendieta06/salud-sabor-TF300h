import mongoose, {Schema} from "mongoose";
import { dishesModel } from "./dishes.model.js";

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
        type: Schema.Types.ObjectId,
        ref:"Dish"

    }]
})


export const menuModel = mongoose.model("Menu", menuSchema);



