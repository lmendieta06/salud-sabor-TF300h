import mongoose from "mongoose";
import { userModel } from "./user.models.js";

export const adminSchema = mongoose.Schema({

categoriaAdmin:{ 
    type: Boolean,
    required : true,
    default : true

}

});


export const adminModel = userModel.discriminator("admin", adminSchema);

