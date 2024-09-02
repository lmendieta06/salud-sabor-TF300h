import jwt from 'jsonwebtoken';
import { secretKey } from '../lib/jwt.js';

const auth = (requiredRole) => {
  return (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'No se encontró token en el encabezado Authorization' });
    }

    // Obtener el token después de 'Bearer'
    const token = authorizationHeader.split(' ')[1];
    console.log('Token:', token); // Verificación

    if (!token) {
      return res.status(401).json({ message: 'No se encontró token' });
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      console.log('Decoded Token:', decoded); // Verificación

      // Validación adicional para el rol de admin
      // Verificación de roles
      if (requiredRole) {
        if (requiredRole === 'admin' && !decoded.isAdmin) {
          return res.status(403).json({ message: 'Acceso denegado, no tiene permisos de administrador' });
        } else if (requiredRole === 'user' && decoded.isAdmin) {
          return res.status(403).json({ message: 'Acceso denegado, no se permite a los administradores acceder como usuario' });
        }
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido', error: error.message });
    }
  };
};

export default auth; // Verificación

      // // Validación de rol
      // if (requiredRole && requiredRole !== decoded.role) {
      //   return res.status(403).json({ message: 'Acceso denegado' });
      // }

  