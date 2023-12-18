const express = require('express');
const router = express.Router();
const procesoController = require('../controllers/procesoController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/:id', requireAuth, procesoController.getById);
router.post('/', requireAuth, procesoController.create);
router.put('/:id', requireAuth, procesoController.update);
router.delete('/:id', requireAuth, procesoController.delete);
router.get('/', requireAuth, procesoController.getAll);

module.exports = router;
