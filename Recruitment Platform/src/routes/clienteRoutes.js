const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/:id/celulas', clienteController.getCelulasByClienteId); 
router.get('/:id', clienteController.getById);
router.get('/', clienteController.getAll);

module.exports = router;
