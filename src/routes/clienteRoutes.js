const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

//Obtener célula por ID de cliente 
router.get('/:id/celulas', requireAuth, clienteController.getCelulasByClienteId); 

//Obtener cliente por ID
router.get('/:id', requireAuth, clienteController.getById);

//Obtener todos los clientes 
router.get('/', requireAuth, clienteController.getAll);

//Crear un cliente (Rol administrador)
router.post('/crear', requireAuth, requireRole([1]), clienteController.createCliente);

//Actualizar un cliente (Rol administrador)
router.put('/actualizar/:id', requireAuth, requireRole([1]), clienteController.updateCliente);

//Eliminar un cliente (Rol administrador)
router.delete('/eliminar/:id', requireAuth, requireRole([1]), clienteController.deleteCliente);

module.exports = router;
