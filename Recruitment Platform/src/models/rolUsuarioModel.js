const db = require('../config/database');

class RolUsuario {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM rolUsuario', (err, result) => {
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
