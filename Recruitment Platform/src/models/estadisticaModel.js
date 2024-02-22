const { pool } = require('../config/database');

class Estadistica {
    static getEntrevistasPerMonth() {
        let query = `
        SELECT
            anio,
            JSON_OBJECTAGG(
            mes,
            entrevistados
            ) AS entrevistasPorMes
        FROM (
            SELECT
            YEAR(fecha_entrevista) AS anio,
            MONTH(fecha_entrevista) AS mes,
            COUNT(*) AS entrevistados
            FROM
            entrevista
            WHERE
            fecha_entrevista >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
            GROUP BY
            anio, mes
        ) AS subquery
        GROUP BY
            anio
        ORDER BY
            anio DESC;     
        `
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
    static getProcesosPerMonth() {
        let query = `
        SELECT MONTH(fecha_ingreso) AS mes,
        COUNT(id) AS cantidad_procesos 
        FROM proceso
        GROUP BY mes
        ORDER BY mes;    
        `
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
} 

module.exports = Estadistica;
