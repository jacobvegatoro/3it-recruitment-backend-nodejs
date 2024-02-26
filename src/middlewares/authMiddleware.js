const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  //dividir la cadena y tomar la 2da parte (que es el token)
  const token = req.headers.authorization.split(' ')[1];
  console.log('Token recibido:', token);

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Token decodificado:', decoded);
    req.user = decoded;
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
