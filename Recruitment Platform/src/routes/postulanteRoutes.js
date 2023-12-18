const express = require('express');
const router = express.Router();
const postulanteController = require('../controllers/postulanteController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/buscar', requireAuth, postulanteController.searchByKeyword);
router.get('/paginacion', requireAuth, postulanteController.getAllPaginated);
router.get('/:id', requireAuth, postulanteController.getById);
router.post('/', requireAuth, postulanteController.create);
router.put('/:id', requireAuth, postulanteController.update);
router.delete('/:id', requireAuth, postulanteController.delete);
router.get('/', requireAuth, postulanteController.getAll);

module.exports = router;
