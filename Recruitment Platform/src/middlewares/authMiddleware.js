/*
Crea un middleware para la verificación del token (authMiddleware.js).
Este middleware se utilizará en las rutas que requieren autenticación.
*/
/*
Amplía el middleware de autenticación para incluir la autorización.
Esto podría implicar verificar los roles del usuario y asegurarse de que tengan los permisos adecuados para acceder a ciertos recursos.
*/
/*
En este middleware, verificaré la autenticación basada en el token JWT 
y, opcionalmente, también manejaré la autorización verificando los roles del usuario.
*/

const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const requireAuth = (req, res, next) => {
  const token = req.header('Authorization');

  // Verificar si el token está presente en el encabezado
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar la información del usuario al objeto de solicitud para su uso posterior
    req.user = decoded;

    // Llamar a la siguiente función en la cadena de middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

// Middleware opcional para autorización basada en roles
// aplicarlo a rutas específicas para asegurarse de que solo los usuarios con roles específicos tengan acceso
const requireRole = (role) => (req, res, next) => {
  if (req.user && req.user.idRolUsuario === role) {
    // El usuario tiene el rol requerido
    next();
  } else {
    return res.status(403).json({ error: 'Acceso prohibido. Permiso insuficiente.' });
  }
};

module.exports = { requireAuth, requireRole };
