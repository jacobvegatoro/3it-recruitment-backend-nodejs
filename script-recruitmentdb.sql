CREATE DATABASE recruitment_db CHARACTER SET utf8 COLLATE utf8_general_ci;
USE recruitment_db;

DROP TABLE IF EXISTS respuesta;
DROP TABLE IF EXISTS pregunta;
DROP TABLE IF EXISTS entrevista;
DROP TABLE IF EXISTS etapaProceso;
DROP TABLE IF EXISTS etapa;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS rolUsuario;
DROP TABLE IF EXISTS proceso;
DROP TABLE IF EXISTS rol;
DROP TABLE IF EXISTS postulante;
DROP TABLE IF EXISTS curso;
DROP TABLE IF EXISTS encuesta;
DROP TABLE IF EXISTS reunion;
DROP TABLE IF EXISTS capacitacion;
DROP TABLE IF EXISTS tritiano;
DROP TABLE IF EXISTS celula;
DROP TABLE IF EXISTS cliente;

/* TABLA DE POSTULANTES */
CREATE TABLE postulante (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombres VARCHAR(100) NOT NULL,
	apellidos VARCHAR(100) NOT NULL,
	ciudad VARCHAR(50),
	enlaceBizneo VARCHAR(1000)
);

/* TABLA DE CLIENTES */
CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    casaMatriz VARCHAR(100)
);

/* TABLA CÉLULA */
CREATE TABLE celula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    idCliente INT,
    CONSTRAINT fk_celula_cliente FOREIGN KEY (idCliente) REFERENCES cliente(id)
);

/* TABLA ROL */    
CREATE TABLE rol (
	id INT AUTO_INCREMENT PRIMARY KEY,
    detalle VARCHAR(50) NOT NULL
);

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

/* TABLA PREGUNTA */
CREATE TABLE pregunta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    detalle VARCHAR(100) NOT NULL,
    activo BOOLEAN,
    idRol INT,
    CONSTRAINT fk_pregunta_rol FOREIGN KEY (idRol) REFERENCES rol(id)
);

/* TABLA RESPUESTA */
CREATE TABLE respuesta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    textoPregunta TEXT,
    textoRespuesta TEXT,
    puntaje INT,
    idEntrevista INT,
    CONSTRAINT fk_respuesta_entrevista FOREIGN KEY (idEntrevista) REFERENCES entrevista(id)
);

/*TABLA ROLES DE USUARIO*/
CREATE TABLE rolUsuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);
    
/*TABLA USUARIO*/
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

/*TABLA ETAPAS DE PROCESO*/
CREATE TABLE etapa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);
    
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

/* TABLA TRITIANO */
CREATE TABLE tritiano (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    enlaceBizneo VARCHAR(1000),
    idCelula INT,
    CONSTRAINT fk_tritiano_celula FOREIGN KEY (idCelula) REFERENCES celula(id)
);

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

/* TABLA ENCUESTA */
CREATE TABLE encuesta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta VARCHAR(100) NOT NULL,
    respuesta TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idCapacitacion INT NOT NULL,
    CONSTRAINT fk_encuesta_capacitacion FOREIGN KEY (idCapacitacion) REFERENCES capacitacion(id)
);

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

/*INSERCION DE DATOS*/

INSERT INTO postulante (id, nombres, apellidos, ciudad, enlaceBizneo)
VALUES
    (1, 'Juan', 'Pérez', 'Ciudad1', 'https://bizneo.com/juanperez'),
    (2, 'María', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    (3, 'Pedro', 'Rodríguez', 'Ciudad3', 'https://bizneo.com/pedrorodriguez'),
    (4, 'Ejemplo4', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    (5, 'Ejemplo5', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    (6, 'Ejemplo6', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    (7, 'Ejemplo7', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    (8, 'Ejemplo8', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    (9, 'Ejemplo9', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    (10, 'Ejemplo10', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    (11, 'Ejemplo11', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez'),
    (12, 'Ejemplo12', 'Gómez', 'Ciudad2', 'https://bizneo.com/mariagomez');

INSERT INTO cliente (id, nombre, casaMatriz)
VALUES
	(1, 'Banco de Chile', 'Providencia'),
    (2, 'Banco Estado', 'Huérfanos');

INSERT INTO celula (id, nombre, idCliente)
VALUES
    (1, 'Célula 1', 1),
    (2, 'Célula 2', 1),
    (3, 'Célula 3', 2);

INSERT INTO rol (id, detalle)
VALUES
	(1, 'Rol 1'),
    (2, 'Rol 2'),
    (3, 'Rol 3');

INSERT INTO proceso (id, idPostulante, idRol, idCelula)
VALUES
    (1, 1, 1, 1),
    (2, 2, 2, 2),
    (3, 3, 3, 3),
    (4, 3, 3, 1);

INSERT INTO entrevista (
    id, 
    fecha_entrevista,
    perfilBuscado,
    comentariosGenerales,
    recomendaciones,
    descripcionPersonal,
    preguntasCandidato,
    idProceso
) VALUES
	(1, '2023-11-30 10:00:00', 'Perfil 1', 
    'Comentario general 1', 'Recomendación 1', 'Descripción personal 1', 'Preguntas candidato 1', 1),
	(2, '2023-11-30 11:30:00', 'Perfil 2', 
    'Comentario general 2', 'Recomendación 2', 'Descripción personal 2', 'Preguntas candidato 2', 2),
	(3, '2023-11-30 14:45:00', 'Perfil 3', 
    'Comentario general 3', 'Recomendación 3', 'Descripción personal 3', 'Preguntas candidato 3', 1);

INSERT INTO pregunta (id, detalle, activo, idRol)
VALUES
    (1, 'Pregunta 1?', true, 1),
    (2, 'Pregunta 2?', false, 2),
    (3, 'Pregunta 3?', true, 3);

INSERT INTO respuesta (id, textoPregunta, textoRespuesta, puntaje, idEntrevista)
VALUES
    (1, 'Pregunta 1','Respuesta 1', 7, 1),
    (2, 'Pregunta 2','Respuesta 2', 5, 2),
    (3, 'Pregunta 3','Respuesta 3', 6, 3),
    (4, 'Pregunta 4','Respuesta 4', 7, 1),
    (5, 'Pregunta 5','Respuesta 5', 5, 2),
    (6, 'Pregunta 6','Respuesta 6', 6, 3),
    (7, 'Pregunta 7','Respuesta 7', 7, 1),
    (8, 'Pregunta 8','Respuesta 8', 5, 2),
    (9, 'Pregunta 9','Respuesta 9', 6, 3);

INSERT INTO rolUsuario (id, nombre)
VALUES
    (1, 'Administrador'),
    (2, 'Usuario');

/*Obs: La clave de los usuarios de muestra es su mismo login*/
INSERT INTO usuario (id, nombre, apellido, login, clave, correo, telefono, idRolUsuario)
VALUES
    (1, 'Nombre 1', 'Apellido 1', 'login1', '$2a$10$9Q5UO0IHfE8IOAvifJ7x8eK9DnT6QVx6I.YTq6OS8WgIeRlhdTUju', 'email1@gmail.com', '+56991234', 1),
    (2, 'Nombre 2', 'Apellido 2', 'login2', '$2a$10$SPvon0fcRwXzdyRhKZOxMOpG8VliFp3PdrpF7XX/R5de3K2ccFzS2', 'email2@gmail.com', '+56991234', 2),
    (3, 'Nombre 3', 'Apellido 3', 'login3', '$2a$10$BSYJhag4r0Mq0CPI2eYUuOLr6.o6uicj9Na5FRi0ERtOLi6b/Y0KW', 'email3@gmail.com', '+56991234', 2);

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

INSERT INTO etapaProceso (id, comentario, estado, idProceso, idEtapa, idUsuario)
VALUES
    (1, 'Comentario 1', 'Pendiente', 1, 1, 1),
    (2, 'Comentario 2', 'Revisado', 2, 2, 2),
    (3, 'Comentario 3', 'Descartado', 3, 3, 3);    

INSERT INTO tritiano (id, nombres, apellidos, enlaceBizneo, idCelula)
VALUES
    (1, 'Tritiano', 'Uno', 'http://www.bizneo.com/tritianouno', 1),
    (2, 'Tritiano', 'Dos', 'http://www.bizneo.com/tritianodos', 2),
    (3, 'Tritiano', 'Tres', 'http://www.bizneo.com/tritianotres', 3);

INSERT INTO capacitacion (id, rolActual, rolEsperado, idTritiano)
VALUES
    (1, 'Rol actual 1', 'Rol esperado 1', 1),
    (2, 'Rol actual 2', 'Rol esperado 2', 2),
    (3, 'Rol actual 3', 'Rol esperado 3', 3);

INSERT INTO reunion (id, objetivo, temasTratados, acuerdos, idCapacitacion)
VALUES
    (1, 'Tema reunión 1', 'Minuta reunión 1', 'Acuerdos reunión 1', 1),
    (2, 'Tema reunión 2', 'Minuta reunión 2', 'Acuerdos reunión 2', 2),
    (3, 'Tema reunión 3', 'Minuta reunión 3', 'Acuerdos reunión 3', 3);

INSERT INTO encuesta (id, pregunta, respuesta, idCapacitacion)
VALUES
    (1, 'Pregunta 1', 'Respuesta 1', 1),
    (2, 'Pregunta 2', 'Respuesta 2', 2),
    (3, 'Pregunta 3', 'Respuesta 3', 3);

INSERT INTO curso (id, titulo, enlace, duracion, cobertura, comentarios, idCapacitacion)
VALUES
    (1, 'Curso 1', 'http://www.curso1.com', 10.5, 0, 'Comentarios curso 1', 1),
    (2, 'Curso 2', 'http://www.curso2.com', 15.3, 0, 'Comentarios curso 2', 2),
    (3, 'Curso 3', 'http://www.curso3.com', 20.1, 0, 'Comentarios curso 3', 3);

