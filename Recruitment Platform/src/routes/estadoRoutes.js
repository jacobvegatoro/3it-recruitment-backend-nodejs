const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/:id', requireAuth, estadoController.getById);
router.get('/', requireAuth, estadoController.getAll);

module.exports = router;
