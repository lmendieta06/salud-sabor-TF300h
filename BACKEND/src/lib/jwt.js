import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const secretKey = process.env.JWT_SECRETKEY;

// Función para generar tokens (JWT)
export function generateToken(payload) {
    return new Promise((res, rej) => {
        jwt.sign(payload, secretKey, { expiresIn: '1h' }, (error, token) => {
            if (error) {
                rej(new Error('Error al generar JWT ' + error.message));
            } else {
                res(token);
            }
        });
    });
}

// Función para verificar token (JWT)
export function verifyToken(token) {
    return new Promise((res, rej) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                rej(new Error('Error al decodificar JWT ' + error.message));
            } else {
                res(decoded);
            }
        });
    });
}