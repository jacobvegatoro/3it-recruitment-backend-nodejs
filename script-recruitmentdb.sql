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


/* TABLA RESPUESTA */
CREATE TABLE respuesta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    detalle TEXT,
    puntaje INT,
    idEntrevista INT,
    idPregunta INT,
    CONSTRAINT fk_entrevista_id FOREIGN KEY (idEntrevista) REFERENCES entrevista(id),
    CONSTRAINT fk_pregunta_respuesta_id FOREIGN KEY (idPregunta) REFERENCES pregunta(id)
);
INSERT INTO respuesta (detalle, puntaje, idEntrevista, idPregunta)
VALUES
    ('Respuesta 1', 7, 1, 1),
    ('Respuesta 2', 5, 2, 2),
    ('Respuesta 3', 6, 3, 3);


/*TABLA ROLES DE USUARIO*/
CREATE TABLE rolUsuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);
INSERT INTO rolUsuario (nombre)
VALUES
    ('Administrador'),
    ('Usuario');
    
    
/*TABLA USUARIO*/
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    login TEXT,
    clave TEXT,
    correo VARCHAR(100),
    telefono TEXT,
    idRolUsuario INT,
    CONSTRAINT fk_rolUsuario_id FOREIGN KEY (idRolUsuario) REFERENCES rolUsuario(id)
);
INSERT INTO usuario (nombre, apellido, login, clave, correo, telefono, idRolUsuario)
VALUES
    ('Nombre 1', 'Apellido 1', 'login1', 'password1', 'email1@gmail.com', '+56991234', 1),
    ('Nombre 2', 'Apellido 2', 'login2', 'password2', 'email2@gmail.com', '+56991234', 2),
    ('Nombre 3', 'Apellido 3', 'login3', 'password3', 'email3@gmail.com', '+56991234', 2);

SELECT * FROM usuario WHERE login = 'nusuario2' LIMIT 1;
select * from usuario;
delete FROM usuario WHERE id = 4;




/*TABLA ROLES DE ESTADO*/
CREATE TABLE estado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);
INSERT INTO estado (nombre)
VALUES
    ('Iniciado'),
    ('Prueba técnica'),
    ('Descartado prueba técnica'),
    ('Entrevista técnica'),
    ('Descartado entrevista técnica'),
    ('Entrevista cliente'),
    ('Descartado entrevista cliente'),
    ('Entrevista psicológica'),
    ('Contratado');
    
    
/* TABLA ESTADO-PROCESO */
CREATE TABLE estadoProceso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comentario TEXT,
    idProceso INT,
    idEstado INT,
    idUsuario INT,
    CONSTRAINT fk_estado_proceso_id FOREIGN KEY (idProceso) REFERENCES proceso(id),
    CONSTRAINT fk_estado_id FOREIGN KEY (idEstado) REFERENCES estado(id),
    CONSTRAINT fk_usuario_id FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);
INSERT INTO estadoProceso (comentario, idProceso, idEstado, idUsuario)
VALUES
    ('Comentario 1', 1, 1, 1),
    ('Comentario 2', 2, 2, 2),
    ('Comentario 3', 3, 3, 3);    


    
SELECT * FROM postulante;
SELECT * FROM cliente;
SELECT * FROM celula;
SELECT * FROM rol;
SELECT * FROM proceso;
SELECT * FROM entrevista;
SELECT * FROM pregunta;
SELECT * FROM respuesta;
SELECT * FROM rolUsuario;
SELECT * FROM usuario;
SELECT * FROM estado;
SELECT * FROM estadoProceso;





ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'nadmin';



drop table postulante;
drop table cliente;
drop table celula;
drop table rol;
drop table proceso;
drop table entrevista;
drop table pregunta;
drop table respuesta;
drop table rolUsuario;
drop table usuario;
drop table estado;
drop table estadoProceso;