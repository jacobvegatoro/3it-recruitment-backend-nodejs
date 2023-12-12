const express = require('express');
const router = express.Router();
const estadoProcesoController = require('../controllers/estadoProcesoController');

router.get('/detalles', estadoProcesoController.getAllWithDetails);
router.get('/:id', estadoProcesoController.getById);
router.get('/', estadoProcesoController.getAll);

module.exports = router;
