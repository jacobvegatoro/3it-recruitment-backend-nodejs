const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { requireAuth } = require('../middlewares/authMiddleware');

router.get('/:id/celulas', requireAuth, clienteController.getCelulasByClienteId); 
router.get('/:id', requireAuth, clienteController.getById);
router.get('/', requireAuth, clienteController.getAll);
router.post('/crear', requireAuth, clienteController.createCliente);
router.put('/actualizar/:id', requireAuth, clienteController.updateCliente);
router.delete('/eliminar/:id', requireAuth, clienteController.deleteCliente);

module.exports = router;
