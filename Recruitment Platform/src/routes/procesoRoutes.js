const express = require('express');
const router = express.Router();
const procesoController = require('../controllers/procesoController');

router.get('/:id', procesoController.getById);
router.post('/', procesoController.create);
router.put('/:id', procesoController.update);
router.delete('/:id', procesoController.delete);
router.get('/', procesoController.getAll);

module.exports = router;
