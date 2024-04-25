const express = require('express');
const router = express.Router();
const procesoController = require('../controllers/procesoController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/:id', requireAuth, procesoController.getById);
router.post('/', requireAuth, procesoController.create);
router.put('/:id', requireAuth, procesoController.update);
router.delete('/:id', requireAuth, requireRole(1), procesoController.delete);
router.get('/', requireAuth, procesoController.getAll);
router.get('/postulante/:id', requireAuth, procesoController.getByPostulante);
router.get('/buscar/nombre', requireAuth, procesoController.buscarPorNombre);
router.get('/buscar/rol', requireAuth, procesoController.buscarPorRol);
router.get('/buscar/celula', requireAuth, procesoController.buscarPorCelula);

module.exports = router;
