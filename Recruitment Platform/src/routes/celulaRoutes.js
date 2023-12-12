const express = require('express');
const router = express.Router();
const celulaController = require('../controllers/celulaController');

router.get('/:id', celulaController.getById);
router.get('/', celulaController.getAll);

module.exports = router;
