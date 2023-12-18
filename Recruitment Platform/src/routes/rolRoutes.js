const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.post('/', requireAuth, rolController.create);
router.get('/', requireAuth, rolController.getAll);

module.exports = router;
