import { adminModel } from "../models/admin.models";








// petición POST para crear administradores
export const postAdmin = async (request, response) => {
    try{

        const {nombreAdmin, correoAdmin, contrasenaAdmin} = request.body;

        const newAdmin = await adminModel.create({
            nombreAdmin,
            correoAdmin,
            contrasenaAdmin,
            categoriaAdmin: true
        })

        return response.status(201).json({
            estado: '201',
            mensaje: 'Administrador creado correctamente',
            datos: newAdmin
        })
    } catch(error){
        return response.status(400).json({
            estado: '400',
            mensaje: 'Ocurrió un problema al crear un administrador',
            datos: error
        })
    }
}










// Mostrar todos los administradores
export const getAdmin = async (request, response) => {
    try{
        // -> encontrar -> find()
        const allAdmins = await adminModel.find();
        // validadr si no hay usuarios
        if(allAdmins.length === 0){
            return response.status(200).json({
                estado: '200',
                mensaje: 'No se encontraron administradores en la base de datos',
                datos: null
            })
        }

        return response.status(200).json({
            estado: '200',
            mensaje: 'Estos son todos los administradores encontrados',
            cantidadAdmins: allAdmins.length,
            admins: allAdmins
        })

    }catch(e){
        return response.status(400).json({
            estado: '400',
            mensaje: 'Ocurrió un problema al buscar los administradores',
            datos: error
        })
    }
}







// Actualizar administradores
export const putAdminById = async (request, response) => {
  
    try {
        let idForPut = request.params.id
        const dataForUpdate = request.body
        const adminUpdated = await userModel.findByIdAndUpdate(idForPut, dataForUpdate);



        if(!adminUpdated){

            return response.status(200).json({
                estado: "200",
                mensaje: "No se encontro ese usuario"})

            };
     
        return response.status(200).json({
            estado: '200',
            mensaje:'Se actualizó correctamente el admin',
            datos: adminUpdated
        });
        
    } catch (error) {
        return response.status(400).json({
            estado: '400',
            mensaje: 'Ocurrió un problema al actualizar usuario',
            datos: error,
        });
    };
}
