import { productModel } from "../models/product.model.js";
//importamos el esquema de nuestro producto
// RECUERDA SIEMPRE AÑADIR el "js" al final de la carpeta vinculada para evitar errores



//Peticion GET -> me muestra los productos


//----------------------- ---------------- ----------------- ------------- -------- ------------------------------------------------
//----------------------- ----------------- ---------------- -------------- ------- -------------------------------------------------


export const getAllProducts = async (req, res) => {
  
    // manejo de errores
    try{
    let products = await productModel.find();
    // validacion en el caso de que no hayan productos
    if(products.length === 0){
        return res.status(404).json({message: "no se encontraron productos"})
    }
    
    return res.status(200).send(products);
    
    } catch(error){
    
        // 500 -> error inesperado del servidor
        return res.status(500).json({message:"error del servidor"});
    }
    
    }

//----------------------- ---------------- ----------------- ------------- -------- ------------------------------------------------
//----------------------- ----------------- ---------------- -------------- ------- -------------------------------------------------


    //peticion POST crea los productos uno por uno
export const postProduct = async (req, res) => {
   

    const {imagen, nombre, descripcion, precio} =req.body;
    
    //validacion de que se hayan ingresado todos los datos
    
    if(!imagen || !nombre || !descripcion || !precio ){
    
        return res.status(400).json({message: " debe ingresar todos los campos requeridos nombre, imagen, precio y modelo"});
    }
    try{
        // req.body. Debe esperar los datos que le estoy enviando
        const newProduct = await productModel.create(req.body);
        return res.status(201).json(newProduct)
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
    


    }



    //----------------------- ---------------- ----------------- ------------- -------- ------------------------------------------------
//----------------------- ----------------- ---------------- -------------- ------- -------------------------------------------------






    // peticion DELETE me elimina los productos por ID
export const deleteProductById = async (req, res) => {
    try {
        let idForDelete = req.params._id;
        let productDeleted = await productModel.findByIdAndDelete(idForDelete);

        //validación cuando no encontramos el producto solicitado
        if (!productDeleted) {
            return res.status(404).json({ message: 'Lo siento! no se encontró producto para borrar' });
        }

        return res.status(200).json({ msg: 'Producto eliminado correctamente' });
    } catch (error) {
        //500 -> error inesperado en el servidor
        return res.status(500).json({ message: error.message });
    }
    
}


//----------------------- ---------------- ----------------- ------------- -------- ------------------------------------------------
//----------------------- ----------------- ---------------- -------------- ------- -------------------------------------------------




// peticion 
export const putProductById = async (req, res) => {
   try{
    //acceder a nuestro parametro id
    let idForUpdate = req.params._id;
    // acceder al cuerpo de nuestra peticion
    //primero le indica el id y luego el cuerpo de su pticion req.body
    let productUpdated = await productModel.findByIdAndUpdate(idForUpdate, req.body);
    //validacion cuando no encontramos producto solicitado
    if(!productUpdated){
        return  res.status(404).json({message: " lo siento! no se encontro producto para modificar"});
        
    }
    return res.status(200).json({message: " producto actualizado correctamente"})

   } catch(error){
    return res.status(500).json({message: error.message});

   }
}


//_____  ______ _______ _____ _____ _____ ____  _   _ ______  _____ 
// |  __ \|  ____|__   __|_   _/ ____|_   _/ __ \| \ | |  ____|/ ____|
// | |__) | |__     | |    | || |      | || |  | |  \| | |__  | (___  
// |  ___/|  __|    | |    | || |      | || |  | | . ` |  __|  \___ \ 
// | |    | |____   | |   _| || |____ _| || |__| | |\  | |____ ____) |
// |_|    |______|  |_|  |_____\_____|_____\____/|_| \_|______|_____/ 
                                                                   
                                                                   
























