const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get('/:id', requireAuth, usuarioController.getById);

router.post('/', requireAuth, validationMiddleware.validateCreateUser, validationMiddleware.handleValidationErrors, usuarioController.create);
router.put('/:id', requireAuth, validationMiddleware.validateUpdateUser, validationMiddleware.handleValidationErrors, usuarioController.update);

router.delete('/:id', requireAuth, requireRole(1), usuarioController.delete);
router.get('/', requireAuth, requireRole(1), usuarioController.getAll);

module.exports = router;


/*
En usuarioRoutes.js, actualizar las rutas existentes para incluir la autenticación.
Por ejemplo, si tienes un endpoint para obtener la lista de usuarios, asegúrate de agregar el middleware de autenticación.
*/
/*
Actualiza las rutas para incluir la autorización.
Por ejemplo, si tienes un endpoint para editar un usuario, verifica que solo los usuarios con ciertos roles específicos puedan realizar esta acción.
*/
/*
Integra el middleware de validación en las rutas que manejan la entrada de datos, como la creación de un nuevo usuario.
*/
