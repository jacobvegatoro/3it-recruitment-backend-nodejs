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







    
SELECT * FROM postulante;
SELECT * FROM cliente;
SELECT * FROM celula;

/*Todas las células que tiene un cliente en específico (query del lado del cliente)*/
SELECT * FROM celula WHERE idCliente = 1; 

/*Cliente al que está asociada la célula (query del lado de la célula)*/
SELECT celula.*, cliente.*
FROM celula
JOIN cliente ON celula.idCliente = cliente.id
WHERE celula.id = 3;


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