const express = require('express');
const router = express.Router();
const celulaController = require('../controllers/celulaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/:id', requireAuth, celulaController.getById);
router.get('/', requireAuth, celulaController.getAll);

module.exports = router;
