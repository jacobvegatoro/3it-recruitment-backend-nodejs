const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { pool } = require('../config/database');

const AuthController = {
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { login, clave } = req.body;

      pool.query('SELECT * FROM usuario WHERE login = ? LIMIT 1', [login], async (err, results) => {
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }

        const user = results[0];

        if (!user) {
          return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        console.log('Usuario:', user);
        console.log('Contraseña ingresada:', clave);
        console.log('Contraseña almacenada:', user.clave);

        try {
          const match = await bcrypt.compare(clave, user.clave);

          if (!match) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
          }

          console.log('JWT_SECRET:', process.env.JWT_SECRET_KEY);
          
          const token = jwt.sign(
            { userId: user.id, 
              login: user.login, 
              idRolUsuario: user.idRolUsuario 
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
          );

          res.json({ token });
        } catch (compareErr) {
          console.error('Error al comparar contraseñas:', compareErr);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Función para manejar la renovación del token
  refreshToken: async (req, res) => {
    try {
      const { userId, login, idRolUsuario } = req.user;

      // Generar un nuevo token
      const newToken = generateJWT(userId, login, idRolUsuario);

      // Responder con el nuevo token
      res.json({ token: newToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

};

module.exports = AuthController;


/*
Otras funciones que debo implementar:
- Renovación de Token: función que permita a los usuarios renovar sus tokens antes de que expiren, proporcionando un nuevo token válido.
- Cambio de Contraseña
- Logout: función que invalide el token del usuario (podría ser manteniendo una lista de tokens no válidos)
- Registro de Actividad: registra eventos de inicio de sesión, cierres de sesión y otros eventos.
- Bloqueo de Cuenta: bloquear temporalmente una cuenta después de varios intentos fallidos de inicio de sesión.
- Manejo de Tokens Expirados: función que maneje adecuadamente los casos en los que el token ha expirado.
- Validación de Token en el Frontend: función en el frontend para verificar la validez del token antes de realizar operaciones importantes.
*/