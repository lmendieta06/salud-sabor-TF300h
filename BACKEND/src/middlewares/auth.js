import jwt from 'jsonwebtoken';
import { secretKey } from '../lib/jwt.js';

const auth = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No se encontró token' });
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      

      // Validar el rol si se requiere
      if (requiredRole && requiredRole !== decoded.role) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }

      req.user = decoded;
      next(); // Continuar con la siguiente función de middleware
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido', error: error.message });
    }
  };
};

export default auth;