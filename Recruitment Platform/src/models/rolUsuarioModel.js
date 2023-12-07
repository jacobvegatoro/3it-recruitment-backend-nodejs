const db = require('../config/database');

class RolUsuario {
    static getAll(callback){
        db.query('SELECT * FROM rolUsuario', callback);
    }

}
module.exports = RolUsuario;
