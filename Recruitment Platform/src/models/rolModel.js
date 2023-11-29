const db = require('../config/database');

class Rol {
    static getAll(callback){
        db.query('SELECT * FROM rol', callback);
    }

    static create(rol, callback) {
        db.query('INSERT INTO rol SET ?', rol, callback);
    }
}
module.exports = Rol;
