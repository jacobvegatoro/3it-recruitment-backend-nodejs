const AuthModel = require('../auth/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

async function login(req, res) {
    const { login, clave } = req.body;

    try {
        // Buscar usuario por nombre de usuario
        const user = await AuthModel.getUserByUsername(login);
        console.log('Usuario recuperado de la base de datos:', user);

        if (!user) {
            console.log('Usuario no encontrado en la bd');
            res.end(JSON.stringify({ message: 'Credenciales inválidas' }));
            return;
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(clave, user.clave);

        if (!passwordMatch) {
            console.log('Contraseña no coincide');
            res.end(JSON.stringify({ message: 'Credenciales inválidas' }));
            return;
        }

        // Generar un token (sin firma)
        const token = jwt.sign({ userId: user.id, username: user.login }, 'secret_key', { expiresIn: '1h' });

        res.end(JSON.stringify({ message: 'Inicio de sesión exitoso', token }));
    } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ message: 'Error interno del servidor' }));
    }
}

module.exports = { login };
