const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {requireAuth} = require('../middlewares/authMiddleware');

router.post('/', authController.login);
router.post('/logout', requireAuth, authController.logout);
router.post('/refresh-token', requireAuth, authController.refreshToken);
router.get('/check-token', authController.verify);

module.exports = router;
