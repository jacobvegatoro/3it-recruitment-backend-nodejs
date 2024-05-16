const { pool } = require("../config/database");

class Proceso {
  static getAll() {
    /*let query = "select pr.id, pr.fecha_ingreso, " + 
        "JSON_OBJECT('id', ps.id, 'nombres', ps.nombres, 'apellidos', ps.apellidos, 'ciudad', ps.ciudad, 'enlaceBizneo', ps.enlaceBizneo) as postulante, " + 
        "JSON_OBJECT('id', r.id, 'detalle', r.detalle) as rol, " + 
        "JSON_OBJECT('id', c.id, 'nombre', c.nombre) as celula " + 
        "from proceso pr left join postulante ps on pr.idPostulante = ps.id " + 
        "left join rol r on pr.idRol = r.id " + 
        "left join celula c on pr.idCelula = c.id";*/

    let query =
      "select pr.id, pr.fecha_ingreso, pr.comentariosPrueba, pr.puntajePrueba, " +
      "JSON_OBJECT('id', ps.id, 'nombres', ps.nombres, 'apellidos', ps.apellidos, 'ciudad', ps.ciudad, 'enlaceBizneo', ps.enlaceBizneo) as postulante, " +
      "JSON_OBJECT('id', r.id, 'detalle', r.detalle) as rol, " +
      "JSON_OBJECT('id', cl.id, 'nombre', cl.nombre, 'cliente', JSON_OBJECT('id', ci.id, 'nombre', ci.nombre, 'casaMatriz', ci.casaMatriz)) as celula  " +
      "from proceso pr left join postulante ps on pr.idPostulante = ps.id " +
      "left join rol r on pr.idRol = r.id " +
      "left join celula cl on pr.idCelula = cl.id " +
      "left join cliente ci on cl.idCliente = ci.id ";

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
    let query =
      "select pr.id, pr.fecha_ingreso, pr.comentariosPrueba, pr.puntajePrueba, " +
      "JSON_OBJECT('id', ps.id, 'nombres', ps.nombres, 'apellidos', ps.apellidos, 'ciudad', ps.ciudad, 'enlaceBizneo', ps.enlaceBizneo) as postulante, " +
      "JSON_OBJECT('id', r.id, 'detalle', r.detalle) as rol, " +
      "JSON_OBJECT('id', cl.id, 'nombre', cl.nombre, 'cliente', JSON_OBJECT('id', ci.id, 'nombre', ci.nombre, 'casaMatriz', ci.casaMatriz)) as celula  " +
      "from proceso pr left join postulante ps on pr.idPostulante = ps.id " +
      "left join rol r on pr.idRol = r.id " +
      "left join celula cl on pr.idCelula = cl.id " +
      "left join cliente ci on cl.idCliente = ci.id " +
      "where pr.id = ?";

    return new Promise((resolve, reject) => {
      //pool.query('SELECT * FROM proceso WHERE id = ?', [id], (err, result) => {
      pool.query(query, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getByPostulante(idPostulante) {
    let query =
      "select pr.id, pr.fecha_ingreso, pr.comentariosPrueba, pr.puntajePrueba, " +
      "JSON_OBJECT('id', ps.id, 'nombres', ps.nombres, 'apellidos', ps.apellidos, 'ciudad', ps.ciudad, 'enlaceBizneo', ps.enlaceBizneo) as postulante, " +
      "JSON_OBJECT('id', r.id, 'detalle', r.detalle) as rol, " +
      "JSON_OBJECT('id', cl.id, 'nombre', cl.nombre, 'cliente', JSON_OBJECT('id', ci.id, 'nombre', ci.nombre, 'casaMatriz', ci.casaMatriz)) as celula  " +
      "from proceso pr left join postulante ps on pr.idPostulante = ps.id " +
      "left join rol r on pr.idRol = r.id " +
      "left join celula cl on pr.idCelula = cl.id " +
      "left join cliente ci on cl.idCliente = ci.id " +
      "where ps.id = ?";

    return new Promise((resolve, reject) => {
      pool.query(query, [idPostulante], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static buscarPorNombre(nombre) {
    const query = `
    SELECT pr.id, pr.fecha_ingreso, pr.comentariosPrueba, pr.puntajePrueba, 
      JSON_OBJECT('id', ps.id, 'nombres', ps.nombres, 'apellidos', ps.apellidos, 'ciudad', ps.ciudad, 'enlaceBizneo', ps.enlaceBizneo) AS postulante,
      JSON_OBJECT('id', r.id, 'detalle', r.detalle) AS rol,
      JSON_OBJECT('id', cl.id, 'nombre', cl.nombre, 'cliente', JSON_OBJECT('id', ci.id, 'nombre', ci.nombre, 'casaMatriz', ci.casaMatriz)) AS celula
    FROM proceso pr
    LEFT JOIN postulante ps ON pr.idPostulante = ps.id
    LEFT JOIN rol r ON pr.idRol = r.id
    LEFT JOIN celula cl ON pr.idCelula = cl.id
    LEFT JOIN cliente ci ON cl.idCliente = ci.id
    WHERE ps.nombres LIKE ?`;

    const nombreQuery = `%${nombre}%`;

    return new Promise((resolve, reject) => {
      pool.query(query, [nombreQuery], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static buscarPorApellido(apellido) {
    const query = `
  SELECT pr.id, pr.fecha_ingreso, pr.comentariosPrueba, pr.puntajePrueba, 
    JSON_OBJECT('id', ps.id, 'nombres', ps.nombres, 'apellidos', ps.apellidos, 'ciudad', ps.ciudad, 'enlaceBizneo', ps.enlaceBizneo) AS postulante,
    JSON_OBJECT('id', r.id, 'detalle', r.detalle) AS rol,
    JSON_OBJECT('id', cl.id, 'nombre', cl.nombre, 'cliente', JSON_OBJECT('id', ci.id, 'nombre', ci.nombre, 'casaMatriz', ci.casaMatriz)) AS celula
  FROM proceso pr
  LEFT JOIN postulante ps ON pr.idPostulante = ps.id
  LEFT JOIN rol r ON pr.idRol = r.id
  LEFT JOIN celula cl ON pr.idCelula = cl.id
  LEFT JOIN cliente ci ON cl.idCliente = ci.id
  WHERE ps.apellidos LIKE ?`;

    const apellidoQuery = `%${apellido}%`;

    return new Promise((resolve, reject) => {
      pool.query(query, [apellidoQuery], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static buscarPorRol(rol) {
    const query = `
    SELECT pr.id, pr.fecha_ingreso, pr.comentariosPrueba, pr.puntajePrueba, 
    JSON_OBJECT('id', ps.id, 'nombres', ps.nombres, 'apellidos', ps.apellidos, 'ciudad', ps.ciudad, 'enlaceBizneo', ps.enlaceBizneo) as postulante,
    JSON_OBJECT('id', r.id, 'detalle', r.detalle) as rol,
    JSON_OBJECT('id', cl.id, 'nombre', cl.nombre, 'cliente', JSON_OBJECT('id', ci.id, 'nombre', ci.nombre, 'casaMatriz', ci.casaMatriz)) as celula
    FROM proceso pr
    LEFT JOIN postulante ps ON pr.idPostulante = ps.id
    LEFT JOIN rol r ON pr.idRol = r.id
    LEFT JOIN celula cl ON pr.idCelula = cl.id
    LEFT JOIN cliente ci ON cl.idCliente = ci.id
    WHERE r.detalle LIKE ?`;

    const detalleQuery = `%${rol}%`;

    return new Promise((resolve, reject) => {
      pool.query(query, [detalleQuery], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static buscarPorCelula(celula) {
    const query = `
    SELECT pr.id, pr.fecha_ingreso, pr.comentariosPrueba, pr.puntajePrueba, 
    JSON_OBJECT('id', ps.id, 'nombres', ps.nombres, 'apellidos', ps.apellidos, 'ciudad', ps.ciudad, 'enlaceBizneo', ps.enlaceBizneo) as postulante,
    JSON_OBJECT('id', r.id, 'detalle', r.detalle) as rol,
    JSON_OBJECT('id', cl.id, 'nombre', cl.nombre, 'cliente', JSON_OBJECT('id', ci.id, 'nombre', ci.nombre, 'casaMatriz', ci.casaMatriz)) as celula
    FROM proceso pr
    LEFT JOIN postulante ps ON pr.idPostulante = ps.id
    LEFT JOIN rol r ON pr.idRol = r.id
    LEFT JOIN celula cl ON pr.idCelula = cl.id
    LEFT JOIN cliente ci ON cl.idCliente = ci.id
    WHERE cl.nombre LIKE ?`;

    const nombreCelulaQuery = `%${celula}%`;

    return new Promise((resolve, reject) => {
      pool.query(query, [nombreCelulaQuery], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static create(proceso) {
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO proceso SET ?", proceso, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  static update(id, updatedProceso) {
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE proceso SET ? WHERE id = ?",
        [updatedProceso, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM proceso WHERE id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Proceso;
