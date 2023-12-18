const { validationResult, body, param } = require('express-validator');

// Middleware para la validación de datos
const validationMiddleware = {
    
  // validación para la creación de un usuario
  validateCreateUser: [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').trim().notEmpty().withMessage('El apellido es obligatorio'),
    body('login').trim().notEmpty().withMessage('El login es obligatorio'),
    body('clave').trim().notEmpty().withMessage('La clave es obligatoria'),
    body('correo').trim().isEmail().withMessage('El correo electrónico no es válido'),
    body('telefono').trim().notEmpty().withMessage('El teléfono es obligatorio'),
    body('idRolUsuario').isInt().withMessage('El ID del rol de usuario debe ser un número entero'),
  ],

  // validación para la actualización de un usuario
  validateUpdateUser: [
    param('id').not().exists().withMessage('El ID del usuario no se puede modificar'),
    body('nombre').trim().not().isEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellido').trim().not().isEmpty().withMessage('El apellido no puede estar vacío'),
    body('login').trim().not().isEmpty().withMessage('El login no puede estar vacío'),
    body('clave').trim().not().isEmpty().withMessage('La clave no puede estar vacía'),
    body('correo').trim().not().isEmpty().withMessage('El correo no puede estar vacío').isEmail().withMessage('El correo electrónico no es válido'),
    body('telefono').trim().not().isEmpty().withMessage('El teléfono no puede estar vacío'),
    body('idRolUsuario').not().exists().withMessage('El campo idRolUsuario no puede ser cambiado')
  ],

  // manejo de errores de validación
  handleValidationErrors: (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
};

module.exports = validationMiddleware;
