import express from "express";


import dotenv from "dotenv";
//variables de entorno con DOTENV
import cors from "cors"

// import productsRouter from "./routes/product.routes.js";

import { connexionMongo } from "../config/db.js";
import usersRouter from "./routes/user.routes.js";
import { restaurantRouter } from "./routes/restaurants.routes.js";




const app = express();


dotenv.config(); //Nuestras variables de entorno

app.use(cors());

const port = process.env.PORT; //mi puerto en variable de entorno

connexionMongo();


//usamos rutas
// app.use("/", productsRouter);
// Usuarios
app.use("/users", usersRouter);
// Restaurantes
app.use("/restaurants", restaurantRouter);



app.listen(port, ()=>{
    console.log(`El servidor se está escuchando en: http://localhost:${port}`);
});