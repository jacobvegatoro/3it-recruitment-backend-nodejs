const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {requireAuth} = require('../middlewares/authMiddleware');

//Login de usuario
router.post('/', authController.login);

//Cierre de sesión
router.post('/logout', requireAuth, authController.logout);

//Refrescar token
router.post('/refresh-token', requireAuth, authController.refreshToken);

//Verificación de token
router.get('/check-token', authController.verify);

module.exports = router;
