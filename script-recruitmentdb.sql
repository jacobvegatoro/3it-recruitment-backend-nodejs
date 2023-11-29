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
    ('Pedro', 'Rodríguez', 'Ciudad3', 'https://bizneo.com/pedrorodriguez');


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









    
SELECT * FROM postulante;
SELECT * FROM cliente;
SELECT * FROM celula;
SELECT * FROM rol;
SELECT * FROM proceso;

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


/*CREATE TABLE postulantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME,
    perfilBuscado VARCHAR(100) NOT NULL,
    comentariosPrueba VARCHAR(300),
    comentariosGenerales VARCHAR(300),
    recomendaciones VARCHAR(300),
    descripcionPersonal VARCHAR(300),
    preguntasCandidato VARCHAR(300)
);
SELECT * FROM postulantes;

INSERT INTO postulantes (
fecha,
perfilBuscado,
comentariosPrueba,
comentariosGenerales,
recomendaciones,
descripcionPersonal,
preguntasCandidato)
VALUES (
'2023-01-01', 
'Desarrollador Full Stack', 
'Buen desempeño técnico', 
'Excelente comunicación', 
'Sí', 
'Motivado y enfocado', 
'¿Cómo manejas situaciones de presión?'),
  ('2023-02-01', 'Ingeniero de Software', 'Prueba técnica pendiente', 'Buena experiencia en proyectos anteriores', 'No', 'Apasionado por la tecnología', '¿Cuál es tu mayor logro profesional?');
*/

drop table postulante;
drop table cliente;
drop table celula;
drop table rol;
drop table proceso;