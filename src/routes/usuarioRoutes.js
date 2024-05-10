const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.put('/actualizar/:id', requireAuth, requireRole(1), validationMiddleware.validateUpdateUser, validationMiddleware.handleValidationErrors, usuarioController.update);

// para borar a un usuario, se debe estar autenticado y ser admin
router.delete('/eliminar/:id', requireAuth, requireRole(1), usuarioController.delete);

// para ver getById usuarios se necesita estar autenticado y ser admin
router.get('/:id', requireAuth, requireRole(1), usuarioController.getById);

// para ver getAll usuarios se necesita estar autenticado y ser admin
router.get('/', requireAuth, requireRole(1), usuarioController.getAll);

// para registrarse hay que cumplir con los requisitos del middleware (nombre, apellido, login, clave y telefono obligatorio, email debe ser email y rol debe ser numero entero)
router.post('/crear', requireAuth, requireRole(1), validationMiddleware.validateCreateUser, validationMiddleware.handleValidationErrors, usuarioController.create);
/*
Usuario insertado:
{
  "nombre": "Jacob",
  "apellido": "Vega",
  "login": "jvega",
  "clave": "admin123",
  "correo": "jacob.vega@3it.cl",
  "telefono": "+569123456",
  "idRolUsuario": 1
}
*/
module.exports = router;
