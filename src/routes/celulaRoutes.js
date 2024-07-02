const express = require('express');
const router = express.Router();
const celulaController = require('../controllers/celulaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

// Obtener todas las celulas
router.get('/', requireAuth, celulaController.getAll);

// Obtener una celula por su ID
router.get('/:id', requireAuth, celulaController.getById);

// Crear una nueva celula (Rol administrador)
router.post('/crear', requireAuth, requireRole([1]), celulaController.createCelula);

// Editar una celula existente (Rol administrador)
router.put('/actualizar/:id', requireAuth, requireRole([1]), celulaController.editarCelula);

// Eliminar una celula (Rol administrador)
router.delete('/eliminar/:id', requireAuth, requireRole([1]), celulaController.eliminarCelula);

module.exports = router;
