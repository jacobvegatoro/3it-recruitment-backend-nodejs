const express = require('express');
const router = express.Router();
const rolUsuarioController = require('../controllers/rolUsuarioController');

router.get('/', rolUsuarioController.getAll);

module.exports = router;
