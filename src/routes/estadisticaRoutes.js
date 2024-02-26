const express = require('express');
const router = express.Router();
const estadisticaController = require('../controllers/estadisticaController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

router.get('/entrevistas', requireAuth, estadisticaController.getEntrevistas);
router.get('/procesos', requireAuth, estadisticaController.getProcesos);

module.exports = router;
