const express = require('express');
const router = express.Router();
const etapaProcesoController = require('../controllers/etapaProcesoController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/detalles', requireAuth, etapaProcesoController.getAllWithDetails);
router.get('/:id', requireAuth, etapaProcesoController.getById);
router.get('/', requireAuth, etapaProcesoController.getAll);
router.post('/', requireAuth, etapaProcesoController.create);

module.exports = router;