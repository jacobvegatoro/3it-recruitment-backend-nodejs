const express = require('express');
const router = express.Router();
const entrevistaController = require('../controllers/entrevistaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/paginacion', requireAuth, entrevistaController.getAllPaginated);
router.get('/:id', requireAuth, entrevistaController.getById);
router.post('/', requireAuth, entrevistaController.create);
router.put('/:id', requireAuth, entrevistaController.update);
router.delete('/:id', requireAuth, requireRole(1), entrevistaController.delete);
router.get('/', requireAuth, entrevistaController.getAll);

module.exports = router;
