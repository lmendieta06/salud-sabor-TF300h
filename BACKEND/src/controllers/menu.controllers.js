import mongoose from "mongoose";
import { menuModel } from "../models/menu.model.js";




export const getMenus = async(req, res) =>{
    try{
        let menus = await menuModel.find();

        if(menus.length === 0){
            return res.status(200).json({message: "No se encontraron menu creados"});
        }

        return res.status(200).json({
            estado : 200,
            mensaje: "Se encontraron todos los menus",
            cantidad: menus.length,
            menus: menus
        })
    }catch(error){
        return res.status(404).json({
            message: "Hubo un error al hacer la peticion" + error.message
        })
    }
}








export const getMenuByCategory = async(req, res) =>{
    
    try{

        // Requiere el id del usuario
        // El id debe ser llamado igual a como esta escrito en la db
        const menuCategory = req.params.categoria;

        // Usa la funcion find() porque es mas de una coleccion con esa categoria
        // Debe mandarla en objeto porque la funcion find() lo requiere
        const menusCategory = await menuModel.find({ category: { $in: [menuCategory] } });

        if(!menusCategory.length === 0){
            return res.status(200).json({
                estado : 200,
                mensaje : "No se encontraron restaurantes con esa categoria"
            })
        }

        return res.status(200).json({
            estado : 200,
            mensaje : "Se encontraron los siguientes menus",
            restaurantes : menusCategory
        })

    }catch(error){
        return res.status(404).json({
            message: "No se pudo realizar la peticion " + error.message
        })
    }
}




//----------------------------------------------GET MENU BY ID -------------------------------------------------


export const getMenuById = async (req, res) => {
    let idForGet = req.params._id; // Obtener el id 

    try {
        // Buscar el menú por id
        const menu = await menuModel.findById(idForGet).populate('dishes'); //populate para la referencia dishes

        if (!menu) {
            return res.status(404).json({
                estado: "404",
                mensaje: "Menú no encontrado"
            });
        }

       
        return res.status(200).json({
            estado: "200",
            mensaje: "Menú encontrado",
            datos: menu
        });
    } catch (error) {
       
        return res.status(500).json({
            estado: "500",
            mensaje: "No se logró obtener el menú: " + error.message
        });
    }
};








//----------------------------------------------POST(crear) MENU BY ID -------------------------------------------------

export const postMenu = async (req, res) => {
    try {
        // Crear nuevo menú
        const newMenu = new menuModel(req.body);
        await newMenu.save();

  
        return res.status(201).json({
            estado: "201",
            mensaje: "Menú creado correctamente",
            datos: newMenu
        });
    } catch (error) {
      
        return res.status(500).json({
            estado: "500",
            message: "No se logró crear el menú: " + error.message
        });
    }
};
//----------------------------------------------put(actualizar) MENU BY ID -------------------------------------------------

export const updateMenuById = async (req, res) => {
    let idUpdate = req.params._id; // Parametro id
    const updateData = req.body; // Obtener todo desde el cuerpo de la solicitud

    try {
        // Buscar y actualizar el menú y validar que si tome todos los datos
        const updatedMenu = await menuModel.findByIdAndUpdate(idUpdate, updateData, { new: true, runValidators: true });

        if (!updatedMenu) {
            return res.status(404).json({
                estado: "404",
                mensaje: "Menú no encontrado"
            });
        }

  
        return res.status(200).json({
            estado: "200",
            mensaje: "Menú actualizado correctamente",
            datos: updatedMenu
        });
    } catch (error) {
       
        return res.status(500).json({
            estado: "500",
            mensaje: "No se logró actualizar el menú: " + error.message
        });
    }
};
//----------------------------------------------DELETE MENU BY ID -------------------------------------------------


export const deleteMenuById = async (req, res) => {
    try {
        // Obtener el id 
        const idForDelete = req.params._id;

        // Que sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(idForDelete)) {
            return res.status(400).json({
                estado: 400,
                mensaje: "ID no válido"
            });
        }

        // Eliminar el menú por id
        const idValido = await menuModel.findByIdAndDelete(idForDelete);

        if (!idValido) {
            return res.status(404).json({
                estado: 404,
                mensaje: "Menú no encontrado"
            });
        }

        return res.status(200).json({
            estado: 200,
            mensaje: "Menú eliminado exitosamente"
        });
    } catch (error) {
        console.error('Error al eliminar el menú:', error); // Agregar consola de error para depuración
        return res.status(500).json({
            estado: 500,
            mensaje: "No se logró eliminar el menú: " + error.message
        });
    }
};


