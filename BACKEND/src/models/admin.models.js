import mongoose from "mongoose";


export const adminSchema = new mongoose.Schema({

categoriaAdmin:{ 
    type: Boolean,
    required : true,
    default : true

},
nombre:{
    type: String,
    required : true,

},

correoElectronico : {
    type: String,
    required : true,
    unique : true
},

contrasena: {
    type:String,
    required : true,

 }

});


export const adminModel = mongoose.model("admin", adminSchema);

