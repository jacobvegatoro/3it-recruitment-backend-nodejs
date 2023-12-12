const db = require('../config/database');

class AuthModel {
    static async getUserByUsername(login) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuario WHERE login = ?';
            console.log('Consulta SQL:', query);
            console.log('Nombre de usuario a buscar:', login);

            db.query(query, [login], (err, results) => {
                if (err) {
                    console.error('Error en la consulta:', err);
                    reject(err);
                    return;
                }

                if (results.length > 0) {
                    const user = results[0];
                    console.log('Usuario recuperado de la base de datos:', user);
                    resolve(user);
                } else {
                    console.log('Usuario no encontrado en la base de datos.');
                    resolve(null);
                }
            });
        });
    }
}

module.exports = AuthModel;
