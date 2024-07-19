import express from "express";
import { getAllProducts, postProduct, deleteProductById, putProductById} from "../controllers/product.controllers.js" ;


//configuramos el router de express

const productsRouter = express.Router();

// definimos nuestras rutas

// ruta para la peticion GET
// primero determino la ruta y luego le digo que es lo que tiene que hacer
productsRouter.get("/mostrarProductos",getAllProducts);
// ruta para la peticion POST
productsRouter.post("/crearProducto", postProduct );
// ruta para la peticion DELETE
productsRouter.delete("/borrarProducto/:_id" ,deleteProductById );
// ruta para la peticion PUT
productsRouter.put("/actualizarProducto/:_id", putProductById) ;

export default productsRouter;




// ██████   ██████  ██    ██ ████████ ███████ ███████ 
// ██   ██ ██    ██ ██    ██    ██    ██      ██      
// ██████  ██    ██ ██    ██    ██    █████   ███████ 
// ██   ██ ██    ██ ██    ██    ██    ██           ██ 
// ██   ██  ██████   ██████     ██    ███████ ███████ 