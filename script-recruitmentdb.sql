CREATE DATABASE recruitment_db;
USE recruitment_db;


/* TABLA DE POSTULANTES */
CREATE TABLE postulante (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombres VARCHAR(100) NOT NULL,
	apellidos VARCHAR(100) NOT NULL,
	ciudad VARCHAR(50),
	enlaceBizneo VARCHAR(1000)
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
    nombre VARCHAR(50) NOT NULL,
    casaMatriz VARCHAR(100)
);
INSERT INTO cliente (nombre, casaMatriz)
VALUES
	('Banco de Chile', 'Providencia'),
    ('Banco Estado', 'Huérfanos');


/* TABLA CÉLULA */
CREATE TABLE celula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    idCliente INT,
    CONSTRAINT fk_celula_cliente FOREIGN KEY (idCliente) REFERENCES cliente(id)
);
INSERT INTO celula (nombre, idCliente)
VALUES
    ('Célula 1', 1),
    ('Célula 2', 1),
    ('Célula 3', 2);


/* TABLA ROL */    
CREATE TABLE rol (
	id INT AUTO_INCREMENT PRIMARY KEY,
    detalle VARCHAR(50) NOT NULL
);
INSERT INTO rol (detalle)
VALUES
	('Rol 1'),
    ('Rol 2'),
    ('Rol 3');


/* TABLA PROCESO */
CREATE TABLE proceso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comentariosPrueba TEXT,
    puntajePrueba INT,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idPostulante INT,
    idRol INT,
    idCelula INT,
    CONSTRAINT fk_proceso_postulante FOREIGN KEY (idPostulante) REFERENCES postulante(id),
    CONSTRAINT fk_proceso_rol FOREIGN KEY (idRol) REFERENCES rol(id),
    CONSTRAINT fk_proceso_celula FOREIGN KEY (idCelula) REFERENCES celula(id)
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
    fecha_entrevista DATETIME,
    perfilBuscado TEXT,
    comentariosGenerales TEXT,
    recomendaciones TEXT,
    descripcionPersonal TEXT,
    preguntasCandidato TEXT,
    idProceso INT,
    CONSTRAINT fk_entrevista_proceso FOREIGN KEY (idProceso) REFERENCES proceso(id)
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
    detalle VARCHAR(100) NOT NULL,
    activo BOOLEAN,
    idRol INT,
    CONSTRAINT fk_pregunta_rol FOREIGN KEY (idRol) REFERENCES rol(id)
);
INSERT INTO pregunta (detalle, activo, idRol)
VALUES
    ('Pregunta 1?', true, 1),
    ('Pregunta 2?', false, 2),
    ('Pregunta 3?', true, 3);


/* TABLA RESPUESTA */
CREATE TABLE respuesta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    textoPregunta TEXT,
    textoRespuesta TEXT,
    puntaje INT,
    idEntrevista INT,
    CONSTRAINT fk_respuesta_entrevista FOREIGN KEY (idEntrevista) REFERENCES entrevista(id)
);
INSERT INTO respuesta (textoPregunta, textoRespuesta, puntaje, idEntrevista)
VALUES
    ('Pregunta 1','Respuesta 1', 7, 1),
    ('Pregunta 2','Respuesta 2', 5, 2),
    ('Pregunta 3','Respuesta 3', 6, 3),
    ('Pregunta 4','Respuesta 4', 7, 1),
    ('Pregunta 5','Respuesta 5', 5, 2),
    ('Pregunta 6','Respuesta 6', 6, 3),
    ('Pregunta 7','Respuesta 7', 7, 1),
    ('Pregunta 8','Respuesta 8', 5, 2),
    ('Pregunta 9','Respuesta 9', 6, 3);


/*TABLA ROLES DE USUARIO*/
CREATE TABLE rolUsuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);
INSERT INTO rolUsuario (nombre)
VALUES
    ('Administrador'),
    ('Usuario');
    
    
/*TABLA USUARIO*/
/*Obs: La clave de los usuarios de muestra es su mismo login*/
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    login TEXT NOT NULL,
    clave TEXT,
    correo VARCHAR(100),
    telefono VARCHAR(30),
    idRolUsuario INT,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (idRolUsuario) REFERENCES rolUsuario(id)
);
INSERT INTO usuario (nombre, apellido, login, clave, correo, telefono, idRolUsuario)
VALUES
    ('Nombre 1', 'Apellido 1', 'login1', '$2a$10$9Q5UO0IHfE8IOAvifJ7x8eK9DnT6QVx6I.YTq6OS8WgIeRlhdTUju', 'email1@gmail.com', '+56991234', 1),
    ('Nombre 2', 'Apellido 2', 'login2', '$2a$10$SPvon0fcRwXzdyRhKZOxMOpG8VliFp3PdrpF7XX/R5de3K2ccFzS2', 'email2@gmail.com', '+56991234', 2),
    ('Nombre 3', 'Apellido 3', 'login3', '$2a$10$BSYJhag4r0Mq0CPI2eYUuOLr6.o6uicj9Na5FRi0ERtOLi6b/Y0KW', 'email3@gmail.com', '+56991234', 2);

/*TABLA ETAPAS DE PROCESO*/
CREATE TABLE etapa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);
INSERT INTO etapa (id, nombre)
VALUES
    (1,'Postulación'),
    (2,'Revisión de CV'),
    (3,'Prueba técnica'),
    (4,'Entrevista técnica'),
    (5,'Referencias laborales'),
    (6,'Entrevista cliente'),
    (7,'Entrevista psicolaboral'),
    (8,'Carta oferta'),
    (9,'Contratado');
    

/* TABLA ETAPA-PROCESO */
CREATE TABLE etapaProceso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comentario TEXT,
    estado VARCHAR(15),
    idProceso INT,
    idEtapa INT,
    idUsuario INT,
    CONSTRAINT fk_etapa_proceso_proceso FOREIGN KEY (idProceso) REFERENCES proceso(id),
    CONSTRAINT fk_etapa_proceso_etapa FOREIGN KEY (idEtapa) REFERENCES etapa(id),
    CONSTRAINT fk_etapa_proceso_usuario FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);
INSERT INTO etapaProceso (comentario, estado, idProceso, idEtapa, idUsuario)
VALUES
    ('Comentario 1', 'Pendiente', 1, 1, 1),
    ('Comentario 2', 'Revisado', 2, 2, 2),
    ('Comentario 3', 'Descartado', 3, 3, 3);    


/* TABLA TRITIANO */
CREATE TABLE tritiano (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    enlaceBizneo VARCHAR(1000),
    idCelula INT,
    CONSTRAINT fk_tritiano_celula FOREIGN KEY (idCelula) REFERENCES celula(id)
);
INSERT INTO tritiano (nombres, apellidos, enlaceBizneo, idCelula)
VALUES
    ('Tritiano', 'Uno', 'http://www.bizneo.com/tritianouno', 1),
    ('Tritiano', 'Dos', 'http://www.bizneo.com/tritianodos', 2),
    ('Tritiano', 'Tres', 'http://www.bizneo.com/tritianotres', 3);


/* TABLA CAPACITACION */
CREATE TABLE capacitacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fechaInicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaFin TIMESTAMP,
    rolActual VARCHAR(30) NOT NULL,
    rolEsperado VARCHAR(30),
    idTritiano INT NOT NULL,
    CONSTRAINT fk_capacitacion_tritiano FOREIGN KEY (idTritiano) REFERENCES tritiano(id)
);
INSERT INTO capacitacion (rolActual, rolEsperado, idTritiano)
VALUES
    ('Rol actual 1', 'Rol esperado 1', 1),
    ('Rol actual 2', 'Rol esperado 2', 2),
    ('Rol actual 3', 'Rol esperado 3', 3);

/* TABLA REUNION */
CREATE TABLE reunion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    objetivo VARCHAR(100),
    temasTratados TEXT,
    acuerdos TEXT,
    idCapacitacion INT NOT NULL,
    CONSTRAINT fk_reunion_capacitacion FOREIGN KEY (idCapacitacion) REFERENCES capacitacion(id)
);
INSERT INTO reunion (objetivo, temasTratados, acuerdos, idCapacitacion)
VALUES
    ('Tema reunión 1', 'Minuta reunión 1', 'Acuerdos reunión 1', 1),
    ('Tema reunión 2', 'Minuta reunión 2', 'Acuerdos reunión 2', 2),
    ('Tema reunión 3', 'Minuta reunión 3', 'Acuerdos reunión 3', 3);

/* TABLA ENCUESTA */
CREATE TABLE encuesta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta VARCHAR(100) NOT NULL,
    respuesta TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idCapacitacion INT NOT NULL,
    CONSTRAINT fk_encuesta_capacitacion FOREIGN KEY (idCapacitacion) REFERENCES capacitacion(id)
);
INSERT INTO encuesta (pregunta, respuesta, idCapacitacion)
VALUES
    ('Pregunta 1', 'Respuesta 1', 1),
    ('Pregunta 2', 'Respuesta 2', 2),
    ('Pregunta 3', 'Respuesta 3', 3);

/* TABLA CURSO */
CREATE TABLE curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    enlace VARCHAR(1000),
    duracion DECIMAL(5,2),
    cobertura DECIMAL(5,2),
    comentarios TEXT,
    fechaInicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaFin TIMESTAMP,
    idCapacitacion INT NOT NULL,
    CONSTRAINT fk_curso_capacitacion FOREIGN KEY (idCapacitacion) REFERENCES capacitacion(id)
);
INSERT INTO curso (titulo, enlace, duracion, cobertura, comentarios, idCapacitacion)
VALUES
    ('Curso 1', 'http://www.curso1.com', 10.5, 0, 'Comentarios curso 1', 1),
    ('Curso 2', 'http://www.curso2.com', 15.3, 0, 'Comentarios curso 2', 2),
    ('Curso 3', 'http://www.curso3.com', 20.1, 0, 'Comentarios curso 3', 3);


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
SELECT * FROM etapa;
SELECT * FROM etapaProceso;


drop table respuesta;
drop table pregunta;
drop table entrevista;
drop table etapaProceso;
drop table etapa;
drop table usuario;
drop table rolUsuario;
drop table proceso;
drop table rol;
drop table postulante;
drop table curso;
drop table encuesta;
drop table reunion;
drop table capacitacion;
drop table tritiano;
drop table celula;
drop table cliente;
