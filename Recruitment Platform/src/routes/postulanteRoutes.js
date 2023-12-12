const express = require('express');
const router = express.Router();
const postulanteController = require('../controllers/postulanteController');

router.get('/buscar', postulanteController.searchByKeyword);
router.get('/paginacion', postulanteController.getAllPaginated);
router.get('/:id', postulanteController.getById);
router.post('/', postulanteController.create);
router.put('/:id', postulanteController.update);
router.delete('/:id', postulanteController.delete);
router.get('/', postulanteController.getAll);

module.exports = router;
