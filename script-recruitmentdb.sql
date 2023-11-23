CREATE DATABASE recruitment_db;
USE recruitment_db;
CREATE TABLE postulantes (
id INT AUTO_INCREMENT PRIMARY KEY,
nombres VARCHAR(100),
apellidos VARCHAR(100),
ciudad VARCHAR(50),
enlaceBizneo VARCHAR(100)
);
SELECT * FROM postulantes;

INSERT INTO postulantes (nombres, apellidos, ciudad, enlaceBizneo)
VALUES
    ('Juan', 'Pérez', 'Ciudad1', 'https://bizneo.com/juanperez'),
    ('María', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    ('Pedro', 'Rodríguez', 'Ciudad3', 'https://bizneo.com/pedrorodriguez');
SELECT * FROM postulantes;

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


drop table postulantes;