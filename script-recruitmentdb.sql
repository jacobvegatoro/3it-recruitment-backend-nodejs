CREATE DATABASE recruitment_db;
USE recruitment_db;


/* TABLA DE POSTULANTES */
CREATE TABLE postulante (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombres VARCHAR(100),
	apellidos VARCHAR(100),
	ciudad VARCHAR(50),
	enlaceBizneo VARCHAR(100)
);
INSERT INTO postulante (nombres, apellidos, ciudad, enlaceBizneo)
VALUES
    ('Juan', 'Pérez', 'Ciudad1', 'https://bizneo.com/juanperez'),
    ('María', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    ('Pedro', 'Rodríguez', 'Ciudad3', 'https://bizneo.com/pedrorodriguez'),
    ('Ejemplo4', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    ('Ejemplo5', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    ('Ejemplo6', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    ('Ejemplo7', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    ('Ejemplo8', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    ('Ejemplo9', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    ('Ejemplo10', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    ('Ejemplo11', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    ('Ejemplo12', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez');    


/* TABLA DE CLIENTES */
CREATE TABLE cliente (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100),
casaMatriz VARCHAR(100)
);
INSERT INTO cliente (nombre, casaMatriz)
VALUES
	('Banco de Chile', 'Providencia'),
    ('Banco Estado', 'Huerfanos');

    
/* TABLA CÉLULA */
CREATE TABLE celula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    idCliente INT,
    CONSTRAINT fk_cliente_id FOREIGN KEY (idCliente) REFERENCES cliente(id)
);
INSERT INTO celula (nombre, idCliente)
VALUES
    ('celula 1', 1),
    ('celula 2', 1),
    ('celula 3', 2);


/* TABLA ROL */    
CREATE TABLE rol (
	id INT AUTO_INCREMENT PRIMARY KEY,
    detalle TEXT
);
INSERT INTO rol (detalle)
VALUES
	('El rol para este proceso es XYZ'),
    ('El rol para este proceso es ABC'),
    ('El rol para este proceso es 123');


/* TABLA PROCESO */
CREATE TABLE proceso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idPostulante INT,
    idRol INT,
    idCelula INT,
    CONSTRAINT fk_postulante_id FOREIGN KEY (idPostulante) REFERENCES postulante(id),
    CONSTRAINT fk_rol_id FOREIGN KEY (idRol) REFERENCES rol(id),
    CONSTRAINT fk_celula_id FOREIGN KEY (idCelula) REFERENCES celula(id)
);
INSERT INTO proceso (idPostulante, idRol, idCelula)
VALUES
    (1, 1, 1),
    (2, 2, 2),
    (3, 3, 3),
    (3, 3, 1);


/* TABLA ENTREVISTA */
CREATE TABLE entrevista (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_entrevista TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    perfilBuscado TEXT,
    comentariosPrueba TEXT,
    comentariosGenerales TEXT,
    recomendaciones TEXT,
    descripcionPersonal TEXT,
    preguntasCandidato TEXT,
    idProceso INT,
    CONSTRAINT fk_proceso_id FOREIGN KEY (idProceso) REFERENCES proceso(id)
);
INSERT INTO entrevista (
    fecha_entrevista,
    perfilBuscado,
    comentariosPrueba,
    comentariosGenerales,
    recomendaciones,
    descripcionPersonal,
    preguntasCandidato,
    idProceso
) VALUES
	('2023-11-30 10:00:00', 'Perfil 1', 
    'Comentario prueba 1', 'Comentario general 1', 'Recomendación 1', 'Descripción personal 1', 'Preguntas candidato 1', 1),
	('2023-11-30 11:30:00', 'Perfil 2', 
    'Comentario prueba 2', 'Comentario general 2', 'Recomendación 2', 'Descripción personal 2', 'Preguntas candidato 2', 2),
	('2023-11-30 14:45:00', 'Perfil 3', 
    'Comentario prueba 3', 'Comentario general 3', 'Recomendación 3', 'Descripción personal 3', 'Preguntas candidato 3', 1);


/* TABLA PREGUNTA */
CREATE TABLE pregunta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    detalle TEXT,
    activo BOOLEAN,
    idRol INT,
    CONSTRAINT fk_pregunta_rol_id FOREIGN KEY (idRol) REFERENCES rol(id)
);
INSERT INTO pregunta (detalle, activo, idRol)
VALUES
    ('Pregunta 1?', true, 1),
    ('Pregunta 2?', false, 2),
    ('Pregunta 3?', true, 3);






    
SELECT * FROM postulante;
SELECT * FROM cliente;
SELECT * FROM celula;
SELECT * FROM rol;
SELECT * FROM proceso;
SELECT * FROM entrevista;
SELECT * FROM pregunta;

/*Todas las células que tiene un cliente en específico (query del lado del cliente)*/
SELECT * FROM celula WHERE idCliente = 1;

/**/
SELECT celula.*, cliente.*
FROM cliente
JOIN celula ON cliente.id = celula.idCliente
WHERE idCliente = 1;

/**/
SELECT cliente.nombre AS nombre_cliente, celula.nombre AS nombre_celula
FROM cliente
JOIN celula ON cliente.id = celula.idCliente
WHERE cliente.nombre = 'Banco de Chile';


/*Cliente al que está asociada la célula (query del lado de la célula)*/
SELECT celula.*, cliente.*
FROM celula
JOIN cliente ON celula.idCliente = cliente.id
WHERE celula.id = 1;

/* Búsqueda de postulante */
SELECT * FROM postulante
WHERE nombres LIKE 'Juan' OR apellidos LIKE 'Juan';


ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'nadmin';




drop table postulante;
drop table cliente;
drop table celula;
drop table rol;
drop table proceso;
drop table entrevista;
drop table pregunta;
