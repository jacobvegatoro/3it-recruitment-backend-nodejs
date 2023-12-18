const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/preguntaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/', requireAuth, preguntaController.getAll);
router.get('/:id', requireAuth, preguntaController.getById);
router.post('/', requireAuth, preguntaController.create);
router.post('/multiples', requireAuth, preguntaController.createMultiple);
router.put('/:id', requireAuth, preguntaController.update);
router.delete('/:id', requireAuth, preguntaController.delete);

module.exports = router;
