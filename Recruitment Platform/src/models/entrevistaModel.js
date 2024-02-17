const { pool } = require('../config/database');

class Entrevista {
    static getAll() {

        let query = "select " + 
        "e.id, e.fecha_entrevista, e.perfilBuscado, e.comentariosPrueba, e.comentariosGenerales,  " +
        "e.recomendaciones, e.descripcionPersonal, e.preguntasCandidato,  " +
        "JSON_OBJECT('id', p.id, 'fecha_ingreso', p.fecha_ingreso,  " +
        "'postulante', JSON_OBJECT('id', pt.id, 'ciudad', pt.ciudad, 'nombres', pt.nombres, 'apellidos',  " +
        "pt.apellidos, 'enlaceBizneo', pt.enlaceBizneo), " +
        "'rol', JSON_OBJECT('id', r.id, 'detalle', r.detalle),  " +
        "'celula', JSON_OBJECT('id', c.id, 'nombre', c.nombre,  " +
        "'cliente', JSON_OBJECT('id', cli.id, 'nombre', cli.nombre, 'casaMatriz', cli.casaMatriz)  " +
        ")) as proceso " +
        "from entrevista e  " +
        "left join proceso p on e.idProceso = p.id  " +
        "left join postulante pt on p.idPostulante = pt.id " +
        "left join rol r on p.idRol = r.id " +
        "left join celula c on p.idCelula = c.id " +
        "left join cliente cli on c.idCliente = cli.id";

        return new Promise((resolve, reject) => {
            pool.query(query, (err, result) => { 
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getById(id) {

        let query = "select " + 
        "e.id, e.fecha_entrevista, e.perfilBuscado, e.comentariosPrueba, e.comentariosGenerales,  " +
        "e.recomendaciones, e.descripcionPersonal, e.preguntasCandidato,  " +
        "JSON_OBJECT('id', p.id, 'fecha_ingreso', p.fecha_ingreso,  " +
        "'postulante', JSON_OBJECT('id', pt.id, 'ciudad', pt.ciudad, 'nombres', pt.nombres, 'apellidos',  " +
        "pt.apellidos, 'enlaceBizneo', pt.enlaceBizneo), " +
        "'rol', JSON_OBJECT('id', r.id, 'detalle', r.detalle),  " +
        "'celula', JSON_OBJECT('id', c.id, 'nombre', c.nombre,  " +
        "'cliente', JSON_OBJECT('id', cli.id, 'nombre', cli.nombre, 'casaMatriz', cli.casaMatriz)  " +
        ")) as proceso " +
        "from entrevista e  " +
        "left join proceso p on e.idProceso = p.id  " +
        "left join postulante pt on p.idPostulante = pt.id " +
        "left join rol r on p.idRol = r.id " +
        "left join celula c on p.idCelula = c.id " +
        "left join cliente cli on c.idCliente = cli.id WHERE e.id = ?";

        return new Promise((resolve, reject) => {
            pool.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getByProcesoId(idProceso) {

        /*let query = "SELECT " +
        "e.id, e.fecha_entrevista, e.perfilBuscado, e.comentariosPrueba, e.comentariosGenerales, " +
        "e.recomendaciones, e.descripcionPersonal, e.preguntasCandidato, " +
        "JSON_ARRAYAGG( " +
        "JSON_OBJECT('id', r.id, 'textoPregunta', r.textoPregunta, 'textoRespuesta', r.textoRespuesta, 'puntaje', r.puntaje) " +
        ") as respuestas " +
        "FROM entrevista e " +
        "LEFT JOIN respuesta r on r.idEntrevista = e.id  " +
        "WHERE e.idProceso = ? " +
        "GROUP BY e.id, e.fecha_entrevista, e.perfilBuscado, e.comentariosPrueba, e.comentariosGenerales, " +
        "e.recomendaciones, e.descripcionPersonal, e.preguntasCandidato " +
        "ORDER BY e.fecha_entrevista DESC";*/

        let query = "SELECT " +
        "e.id, e.fecha_entrevista, e.perfilBuscado, e.comentariosPrueba, e.comentariosGenerales, " +
        "e.recomendaciones, e.descripcionPersonal, e.preguntasCandidato, e.idProceso " +
        "FROM entrevista e " +
        "WHERE e.idProceso = ? " +
        "ORDER BY e.fecha_entrevista DESC";

        return new Promise((resolve, reject) => {
            pool.query(query, [idProceso], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static create(entrevista) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO entrevista SET ?', entrevista, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static update(id, updatedEntrevista) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE entrevista SET ? WHERE id = ?', [updatedEntrevista, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM entrevista WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getAllPaginated(page, limit) {
        const offset = (page - 1) * limit;
        const query = 'SELECT * FROM entrevista LIMIT ?, ?';

        return new Promise((resolve, reject) => {
            pool.query(query, [offset, limit], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Entrevista;
