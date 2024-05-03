const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/preguntaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/', requireAuth, preguntaController.getAll);
router.get('/rol/:id', requireAuth, preguntaController.getByRolId);
router.post('/crear', requireAuth, preguntaController.create);
router.post('/multiples', requireAuth, preguntaController.createMultiple);
router.get('/:id', requireAuth, preguntaController.getById);
router.put('/actualizar/:id', requireAuth, preguntaController.update);
router.delete('/eliminar/:id', requireAuth, requireRole(1), preguntaController.delete);

module.exports = router;
