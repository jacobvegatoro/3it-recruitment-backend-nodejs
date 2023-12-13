const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const helperFunctions = {
  // generar un hash de contraseña
  generatePasswordHash: async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  },

  // comparar una contraseña con su hash
  comparePassword: async (password, hash) => {
    return bcrypt.compare(password, hash);
  },

  // generar un token JWT
  generateJWT: (userId, login, idRolUsuario) => {
    const payload = { userId, login, idRolUsuario };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  },

  // verificar un token JWT
  verifyJWT: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = helperFunctions;
