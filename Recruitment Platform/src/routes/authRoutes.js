const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {requireAuth} = require('../middlewares/authMiddleware');

router.post('/', authController.login);
router.post('/refresh-token', requireAuth, authController.refreshToken);

module.exports = router;
