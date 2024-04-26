const express = require('express');
const router = express.Router();
const entrevistaController = require('../controllers/entrevistaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/paginacion', requireAuth, entrevistaController.getAllPaginated);
router.get('/buscar/nombre', requireAuth, entrevistaController.buscarPorNombre);
router.get('/buscar/apellido', requireAuth, entrevistaController.buscarPorApellido);
router.get('/buscar/rol', requireAuth, entrevistaController.buscarPorRol);
router.get('/buscar/celula', requireAuth, entrevistaController.buscarPorCelula);
router.get('/buscar/fecha', requireAuth, entrevistaController.buscarPorFecha);
router.get('/:id', requireAuth, entrevistaController.getById);
router.get('/proceso/:id', requireAuth, entrevistaController.getByProcesoId);
router.post('/', requireAuth, entrevistaController.create);
router.put('/:id', requireAuth, entrevistaController.update);
router.delete('/:id', requireAuth, requireRole(1), entrevistaController.delete);
router.get('/', requireAuth, entrevistaController.getAll);

module.exports = router;
