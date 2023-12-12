const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

router.get('/:id', estadoController.getById);
router.get('/', estadoController.getAll);

module.exports = router;
