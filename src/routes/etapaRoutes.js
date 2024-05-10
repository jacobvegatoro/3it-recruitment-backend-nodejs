const express = require('express');
const router = express.Router();
const etapaController = require('../controllers/etapaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/:id', requireAuth, etapaController.getById);
router.get('/', requireAuth, etapaController.getAll);

module.exports = router;
