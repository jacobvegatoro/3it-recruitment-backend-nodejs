const { pool } = require('../config/database');

class Estadistica {
    static getEntrevistasPerMonth() {
        let query =`    SELECT 
                            YEAR(fecha_entrevista) AS anio,
                            MONTH(fecha_entrevista) AS mes,
                            COUNT(*) AS cantidad_entrevistas
                        FROM 
                            entrevista
                        WHERE 
                            fecha_entrevista >= CURDATE() - INTERVAL 12 MONTH
                        GROUP BY 
                            anio, mes
                        ORDER BY 
                            anio ASC, mes ASC;
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
