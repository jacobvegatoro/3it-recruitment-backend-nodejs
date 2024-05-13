const express = require('express');
const router = express.Router();
const celulaController = require('../controllers/celulaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

// Obtener todas las celulas
router.get('/', requireAuth, celulaController.getAll);

// Obtener una celula por su ID
router.get('/:id', requireAuth, celulaController.getById);

// Crear una nueva celula
router.post('/crear', requireAuth, celulaController.createCelula);

// Editar una celula existente
router.put('/actualizar/:id', requireAuth, celulaController.editarCelula);

// Eliminar una celula
router.delete('/eliminar/:id', requireAuth, celulaController.eliminarCelula);

module.exports = router;
