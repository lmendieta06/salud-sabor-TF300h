import mongoose from "mongoose";


export const adminSchema = mongoose.Schema({

categoriaAdmin:{ 
    type: Boolean,
    required : true,
    default : true

},
nombreAdmin:{
    type: String,
    required : true,

},

correoAdmin : {
    type: String,
    required : true,
    unique : true
},

contrasenaAdmin: {
    type:String,
    required : true,

 }

});


export const adminModel = mongoose.model("admin", adminSchema);

