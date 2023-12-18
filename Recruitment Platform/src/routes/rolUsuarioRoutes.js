const express = require('express');
const router = express.Router();
const rolUsuarioController = require('../controllers/rolUsuarioController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/', requireAuth, rolUsuarioController.getAll);

module.exports = router;
