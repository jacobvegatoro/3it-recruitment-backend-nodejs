const { pool } = require('../config/database');

class RolUsuario {
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM rolUsuario', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}
module.exports = RolUsuario;
