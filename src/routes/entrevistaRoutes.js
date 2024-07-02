const express = require('express');
const router = express.Router();
const entrevistaController = require('../controllers/entrevistaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

//Obtener entrevistas con paginacion
router.get('/paginacion', requireAuth, entrevistaController.getAllPaginated);

//Buscar entrevista por nombre de postulante
router.get('/buscar/nombre', requireAuth, entrevistaController.buscarPorNombre);

//Buscar entrevista por apellido de postulante
router.get('/buscar/apellido', requireAuth, entrevistaController.buscarPorApellido);

//Buscar entrevista por rol
router.get('/buscar/rol', requireAuth, entrevistaController.buscarPorRol);

//Buscar entrevista por célula
router.get('/buscar/celula', requireAuth, entrevistaController.buscarPorCelula);

//Buscar entrevista por fecha
router.get('/buscar/fecha', requireAuth, entrevistaController.buscarPorFecha);

//Obtener entrevista por ID
router.get('/:id', requireAuth, entrevistaController.getById);

//Obtener entrevista por ID de proceso
router.get('/proceso/:id', requireAuth, entrevistaController.getByProcesoId);

//Crear entrevista (Rol administrador)
router.post('/', requireAuth, requireRole([1]), entrevistaController.create);

//Crear entrevista (Rol administrador)
router.put('/:id', requireAuth, requireRole([1]), entrevistaController.update);

//Eliminar entrevista (Rol administrador)
router.delete('/:id', requireAuth, requireRole([1]), entrevistaController.delete);

//Obtener todas las entrevistas
router.get('/', requireAuth, entrevistaController.getAll);

module.exports = router;
