const express = require('express');
const router = express.Router();
const respuestaController = require('../controllers/respuestaController');

router.get('/', respuestaController.getAll);
router.get('/:id', respuestaController.getById);
router.post('/', respuestaController.create);
router.post('/multiples', respuestaController.createMultiple);
router.put('/:id', respuestaController.update);
router.delete('/:id', respuestaController.delete);

module.exports = router;
