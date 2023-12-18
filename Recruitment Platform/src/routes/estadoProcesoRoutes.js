const express = require('express');
const router = express.Router();
const estadoProcesoController = require('../controllers/estadoProcesoController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/detalles', requireAuth, estadoProcesoController.getAllWithDetails);
router.get('/:id', requireAuth, estadoProcesoController.getById);
router.get('/', requireAuth, estadoProcesoController.getAll);

module.exports = router;
