import express from "express";


import dotenv from "dotenv";
//variables de entorno con DOTENV
import cors from "cors"



import { connexionMongo } from "../config/db.js";

import adminRouter from "./routes/admin.routes.js";
import menuRouter from "./routes/menu.routes.js";

const app = express();


dotenv.config(); //Nuestras variables de entorno

app.use(cors());

const port = process.env.PORT; //mi puerto en variable de entorno

connexionMongo();


//usamos rutas
app.use("/", adminRouter);
app.use("/", menuRouter);



app.listen(port, ()=>{
    console.log(`El servidor se está escuchando en: http://localhost:${port}`);
});