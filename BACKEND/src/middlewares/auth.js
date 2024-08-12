import { verifyToken } from "../lib/jwt.js";



// manejo de roles
const auth = (requiredRole) => {

    return async (req, res, next) =>{

        // validación de token
        let token = req.headers['authorization'];
        if(!token){
            return res.status(401).json({
                mensaje: 'No se encontró token'
            })
        } 
        if (token) {
            // Quitar la palabra 'Bearer'
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length); // Eliminar 'Bearer ' del inicio
            }
        } else {
            return res.status(401).json({
                mensaje: 'No se encontró token'
            });
        }

        // Verificar si el token es válido
        try {
            // Decodificacion del token
            const decoded = await verifyToken(token);
            console.log('Token decodificado: ', decoded);

            // Validar el rol
            if (requiredRole === 'admin' && !decoded.isAdmin) {
                return res.status(403).json({
                    mensaje: 'Acceso denegado, no tiene permisos de administrador'
                });
            }

            // Adjuntar la información del usuario al request
            req.user = decoded;
            next(); // Continuar con la siguiente función de middleware

        } catch (error) {
            return res.status(401).json({
                mensaje: 'Falló la autenticación con el token, token inválido',
                error: error.message || error
            });
        }
    }
}



export default auth;