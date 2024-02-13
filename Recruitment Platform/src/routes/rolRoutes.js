const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.post('/', requireAuth, requireRole(1), rolController.create);
router.get('/', requireAuth, rolController.getAll);
router.put('/:id', requireAuth, rolController.update);

module.exports = router;
