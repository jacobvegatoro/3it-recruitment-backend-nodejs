const express = require('express');
const router = express.Router();
const respuestaController = require('../controllers/respuestaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/', requireAuth, respuestaController.getAll);
router.get('/:id', requireAuth, respuestaController.getById);
router.get('/entrevista/:id', requireAuth, respuestaController.getByEntrevistaId);
router.post('/', requireAuth, respuestaController.create);
router.post('/multiples', requireAuth, respuestaController.createMultiple);
router.put('/:id', requireAuth, respuestaController.update);
router.put('/multiples/:id', requireAuth, respuestaController.updateMultiple);
router.delete('/:id', requireAuth, requireRole(1), respuestaController.delete);

module.exports = router;
