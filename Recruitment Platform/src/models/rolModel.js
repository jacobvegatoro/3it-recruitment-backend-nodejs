const db = require('../config/database');

class Rol {
    static getAll(callback){
        db.query('SELECT * FROM rol', callback);
    }
}
module.exports = Rol;
