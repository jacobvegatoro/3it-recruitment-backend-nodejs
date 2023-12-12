const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/preguntaController');

router.get('/', preguntaController.getAll);
router.get('/:id', preguntaController.getById);
router.post('/', preguntaController.create);
router.post('/multiples', preguntaController.createMultiple);
router.put('/:id', preguntaController.update);
router.delete('/:id', preguntaController.delete);

module.exports = router;
