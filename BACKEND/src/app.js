import express from "express";

import dotenv from "dotenv";
//variables de entorno con DOTENV
import bodyParser from 'body-parser';
import cors from "cors"


import { connexionMongo } from "../config/db.js";
import usersRouter from "./routes/user.routes.js";
import { restaurantRouter } from "./routes/restaurants.routes.js";
import dishRouter from "./routes/dish.routes.js";
import adminRouter from "./routes/admin.routes.js";
import menuRouter from "./routes/menu.routes.js";
import loginRouter from "./routes/login.routes.js"
import path from 'path';
import { fileURLToPath } from 'url'; // Importar fileURLToPath desde 'url'




const app = express();

dotenv.config(); //Nuestras variables de entorno
// Configurar body-parser con límites
app.use(bodyParser.json({ limit: '50mb' })); // Ajusta el límite según tus necesidades
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));
app.use(express.json());



const port = process.env.PORT; //mi puerto en variable de entorno

connexionMongo();

// Middleware para servir archivos
// Carpeta estática para archivos subidos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, '../uploads');

app.use('/uploads', express.static(uploadsPath));





//usamos rutas
app.use("/admin", adminRouter);
// menu
app.use("/menu", menuRouter)
//platillos
app.use("/dishes", dishRouter)
// Usuarios
app.use("/users", usersRouter);
// Restaurantes
app.use("/restaurants", restaurantRouter);
// login
app.use("/login", loginRouter)


app.listen(port, () => {
    console.log(`El servidor se está escuchando en: http://localhost:${port}`);
});