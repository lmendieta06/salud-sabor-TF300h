import { dishesModel } from "../models/dishes.model.js";

export const postDish = async(req, res) =>{
    try {
        let newDish = await dishesModel.create(req.body);

        return res.status(201).json({
            estado: "201",
            mensaje: "Plato creado correctamente",
            datos: newDish
        });
    } catch (error) {

        return res.status(400).json({
            estado: "400",
            message: "No se logró crear el plato: " + error.message
        });
    }
}

export const getDishes = async(req, res) =>{
    try{
        let dishes = await dishesModel.find();

        if(dishes.length === 0){
            return res.status(200).json({message: "No se encontraron platos"});
        }

        return res.status(200).json({
            estado : 200,
            mensaje: "Se encontraron todos los platos creados",
            dishes
        })
    }catch(error){
        return res.status(404).json({
            message: "Hubo un error al hacer la peticion" + error.message
        })
    }
}

export const getDishById = async(req, res) =>{
    try{

        // Requiere el id del usuario
        // El id debe ser llamado igual a como esta escrito en la db
        let idDish = req.params._id;

        if(idDish.length !== 24){
            return res.status(204).json({
                estado : 204,
                mensaje : "Se debe ingresar un Id valido"
            })
        }

        // 1. Dar la variable donde se recibe el id
        // 2. Pedirle que me envie el cuerpo de esa peticion
        let dish = await dishesModel.findById(idDish);

        if(!dish){
            return res.status(200).json({
                estado : 200,
                mensaje : "No se encontro el plato que busca"
            })
        }

        return res.status(200).json({
            estado : 200,
            mensaje : "Se encontro el siguiente plato",
            usuario : dish
        })

    }catch(error){
        return res.status(404).json({
            message: "No se pudo realizar la peticion " + error.message
        })
    }
}

export const getDishByCategory = async(req, res) =>{
    
    try{

        const categoryDish = req.params.categoriaMenu;

        // Usa la funcion find() porque es mas de una coleccion con esa categoria
        // Debe mandarla en objeto porque la funcion find() lo requiere
        const dishCategory = await dishesModel.find({categoriaMenu : categoryDish});


        if(dishCategory.length === 0){
            return res.status(200).json({
                estado : 200,
                mensaje : "No se encontraron platos con esa categoria"
            })
        }

        return res.status(200).json({
            estado : 200,
            mensaje : "Se encontraron los siguientes platos",
            restaurantes : dishCategory
        })

    }catch(error){
        return res.status(404).json({
            message: "No se pudo realizar la peticion " + error.message
        })
    }
}

export const putDish = async(req, res) =>{
    try{
        let idUpdate = req.params._id;
        // Se debe poder recibir informacion
        const dataForUpdate = req.body;

        let dishUpdate = await dishesModel.findByIdAndUpdate(idUpdate, dataForUpdate);
    
        if(!dishUpdate){
            return res.status(200).json({
                estado : 200,
                mensaje : "No se encontro el plato para actualizar"
            })
        }

        if(idUpdate.length !== 24){
            return res.status(404).json({
                estado : 404,
                mensaje : "No se ingreso el id necesario "
            })
        }

        return res.status(200).json({
            estado : 200,
            mensaje : "Se actualizo correctamente el plato solicitado",
            dato : dishUpdate._id
        })
        
    }catch(error){
        return res.status(404).json({
            message: "No se pudo realizar la peticion " + error.message
        })
    }
}

export const deleteDish = async(req, res) =>{
    try{
        let idDelete = req.params._id;
        let dishDelete = await dishesModel.findByIdAndDelete(idDelete);

        // console.log(restaurantDelete);

            
        if(!dishDelete){
            return res.status(200).json({
                estado : 200,
                mensaje : "No se encontro el plato para eliminar"
            })
        }

        return res.status(200).json({
            estado : 200,
            mensaje : "Se elimino correctamente el plato solicitado",
            usuarioEliminado : dishDelete.nombre
        })

    }catch(error){
        return res.status(404).json({
            message: "No se pudo realizar la peticion " + error.message
        })
    }
}