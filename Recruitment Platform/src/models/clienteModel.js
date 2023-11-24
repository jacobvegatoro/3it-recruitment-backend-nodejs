const db = require('../config/database')

class Cliente {
    static getAll(callback){
        db.query('SELECT * FROM clientes', callback);
    }

    static getById(id, callback){
        db.query('SELECT * FROM clientes WHERE id = ?', [id], callback);
    }
}

module.exports = Cliente;