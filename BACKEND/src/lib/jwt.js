import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRETKEY;


// Función para generar tokens (JWT)
export function generateToken (payload) {
    // función asincrónica
    return new Promise((res, rej)=>{
        // payload, clave secreta, tiempo de expiración
     
        jwt.sign(payload, secretKey, {expiresIn: '1h'}, (error, token)=>{
            //si hay error al generar token
            if(error){
                //  si todo sale mal
                rej(new Error('Error al generar JWT ' + error.message));
            }else{
                // si todo bien
                res(token);
            }
        });
    });
}
// Funcion para verificar token(jwt)
export function verifyToken(token) {

    return new Promise((res, rej)=>{
        jwt.verify(token, secretKey, (error, decoded)=>{
        // validando decodificación
            if(error){
                //si todo sale mal
                rej(new Error('Error al decodificar JWT' + error.message));
            }else{
                // si todo bien
                res(decoded);
            }
        });

    });

}