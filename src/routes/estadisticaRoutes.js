const express = require('express');
const router = express.Router();
const estadisticaController = require('../controllers/estadisticaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

//Obtener estadísticas de entrevistas
router.get('/entrevistas', requireAuth, estadisticaController.getEntrevistas);

//Obtener estadísticas de procesos
router.get('/procesos', requireAuth, estadisticaController.getProcesos);

module.exports = router;
