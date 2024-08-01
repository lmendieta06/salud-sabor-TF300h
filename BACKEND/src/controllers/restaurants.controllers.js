// getRestaurants, getRestaurantsByCategory, getRestaurantsByCity, postRestaurant, putRestaurant, deleteRestaurant

import { restaurantModel } from "../models/restaurants.model.js";

export const postRestaurant = async(req, res) =>{
    try {
        let newRestaurant = await restaurantModel.create(req.body);

        return res.status(201).json({
            estado: "201",
            mensaje: "Restaurante creado correctamente",
            datos: newRestaurant
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                estado: "400",
                message: "El correo electrónico ya está en uso"
            });
        }
        return res.status(400).json({
            estado: "400",
            message: "No se logró crear el restaurante: " + error.message
        });
    }
}

export const getRestaurants = async(req, res) =>{
    try{
        let restaurants = await restaurantModel.find();

        if(restaurants.length === 0){
            return res.status(200).json({message: "No se encontraron restaurantes creados"});
        }

        return res.status(200).json({
            estado : 200,
            mensaje: "Se encontraron todos los restaurantes",
            cantidad: restaurants.length,
            restaurants
        })
    }catch(error){
        return res.status(404).json({
            message: "Hubo un error al hacer la peticion" + error.message
        })
    }
}

export const getRestaurantByCategory = async(req, res) =>{
    
    try{

        // Requiere el id del usuario
        // El id debe ser llamado igual a como esta escrito en la db
        let categoryRestaurant = req.params.categoria;

        // Usa la funcion find() porque es mas de una coleccion con esa categoria
        // Debe mandarla en objeto porque la funcion find() lo requiere
        let restaurants = await restaurantModel.find({categoria : categoryRestaurant});

        if(!restaurants){
            return res.status(200).json({
                estado : 200,
                mensaje : "No se encontraron restaurantes con esa categoria"
            })
        }

        return res.status(200).json({
            estado : 200,
            mensaje : "Se encontraron los siguientes restaurantes",
            restaurantes : restaurants
        })

    }catch(error){
        return res.status(404).json({
            message: "No se pudo realizar la peticion " + error.message
        })
    }
}

export const getRestaurantByCity = async (req, res) => {
    try {

        const cityRestaurant = req.params.ciudad;

        const restaurants = await restaurantModel.find({ ciudad: cityRestaurant });

        if (restaurants.length === 0) {
            return res.status(200).json({
                estado: 200,
                mensaje: "No se encontraron restaurantes en esa ciudad"
            });
        }

        return res.status(200).json({
            estado: 200,
            mensaje: "Se encontraron los siguientes restaurantes",
            cantidad: restaurants.length,
            restaurantes: restaurants
        });

    } catch (error) {
        return res.status(404).json({
            message: "No se pudo realizar la petición: " + error.message
        });
    }
};


export const putRestaurant = async(req, res) =>{

    try{
        let idUpdate = req.params._id;
        // Se debe poder recibir informacion
        const dataForUpdate = req.body;

        let restaurantUpdate = await restaurantModel.findByIdAndUpdate(idUpdate, dataForUpdate);
    
        if(!restaurantUpdate){
            return res.status(200).json({
                estado : 200,
                mensaje : "No se encontro el restaurante para actualizar"
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
            mensaje : "Se actualizo correctamente el restaurante",
            dato : restaurantUpdate._id
        })
        
    }catch(error){
        return res.status(404).json({
            message: "No se pudo realizar la peticion " + error.message
        })
    }

}

export const deleteRestaurant = async(req, res) =>{
    try{
        let idDelete = req.params._id;
        let restaurantDelete = await restaurantModel.findByIdAndDelete(idDelete);

            
        if(!restaurantDelete){
            return res.status(200).json({
                estado : 200,
                mensaje : "No se encontro el restaurante para eliminar"
            })
        }

        return res.status(200).json({
            estado : 200,
            mensaje : "Se elimino correctamente el restaurante",
            usuarioEliminado : restaurantDelete.nombre
        })

    }catch(error){
        return res.status(404).json({
            message: "No se pudo realizar la peticion " + error.message
        })
    }
}
