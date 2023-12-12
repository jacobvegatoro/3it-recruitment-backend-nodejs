const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

router.post('/', rolController.create);
router.get('/', rolController.getAll);

module.exports = router;
