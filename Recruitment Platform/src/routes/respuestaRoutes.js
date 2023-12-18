const express = require('express');
const router = express.Router();
const respuestaController = require('../controllers/respuestaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/', requireAuth, respuestaController.getAll);
router.get('/:id', requireAuth, respuestaController.getById);
router.post('/', requireAuth, respuestaController.create);
router.post('/multiples', requireAuth, respuestaController.createMultiple);
router.put('/:id', requireAuth, respuestaController.update);
router.delete('/:id', requireAuth, respuestaController.delete);

module.exports = router;
