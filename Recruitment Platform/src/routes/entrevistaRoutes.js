const express = require('express');
const router = express.Router();
const entrevistaController = require('../controllers/entrevistaController');

router.get('/paginacion', entrevistaController.getAllPaginated);
router.get('/:id', entrevistaController.getById);
router.post('/', entrevistaController.create);
router.put('/:id', entrevistaController.update);
router.delete('/:id', entrevistaController.delete);
router.get('/', entrevistaController.getAll);

module.exports = router;
