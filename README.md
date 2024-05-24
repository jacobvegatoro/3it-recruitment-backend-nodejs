# Plataforma de reclutamiento
Recruitment es una plataforma que permite registrar entrevistas técnicas de los postulantes, independiente del perfil al cual postule. Contiene todas las acciones que permiten desde la creación de roles, clientes y preguntas, hasta el desarrollo de la entrevista misma, agregando comentarios a la entrevista y puntaje a las respuestas entregadas.

Consiste en un conjunto de APIs creadas en Node y Express, usando autenticación JWT y persistiendo los datos en una base MySQL. 

## Requisitos Previos

- [Node v20.10](https://nodejs.org/en)
- [MySQL v8.2](https://dev.mysql.com/downloads/workbench/)

## Ejecución del Proyecto

- Clonar el repositorio:
```bash
git clone https://github.com/jacobvegatoro/3it-recruitment-backend-nodejs.git
```

- Dentro de MySQL, ejecuta los comandos del archivo `script-recruitmentdb.sql`
- Cambia el nombre del archivo `.env.template` por `.env`
- Modifica los valores del archivo `.env`:
    - JWT_SECRET_KEY: secreto JWT
    - PORT: puerto que utilizará la aplicación
    - DB_HOST: dirección del servidor de base de datos
    - DB_NAME: nombre de la base de datos
    - DB_USER: usuario de la base de datos
    - DB_PASS: clave de usuario de la base de datos
    - DB_PORT: puerto utilizado por el servidor de base de datos
- Instala las dependencias con el comando `npm install`
- Iniciar el proyecto con el comando `npm start` 


## Endpoints:

### Postulante

- CRUD completo (obtener listado, crear, editar, eliminar)
- Obtener postulante por ID
- Obtener listado de postulantes con paginación
- Obtener postulante por nombre o apellido

### Cliente 

- CRUD completo (obtener listado, crear, editar, eliminar)
- Obtener cliente por ID
- Obtener células asociadas a cliente específico

### Célula 

- CRUD completo (obtener listado, crear, editar, eliminar)
- Obtener célula por ID

### Rol (de postulante)

- Obtener listado de roles
- Crear nuevo rol
- Actualizar rol

### Proceso

- CRUD completo (obtener listado, crear, editar, eliminar)
- Obtener proceso por ID
- Obtener procesos de postulante
- Buscar proceso por nombre de postulante
- Buscar proceso por apellido de postulante
- Buscar por rol 
- Buscar por célula

### Entrevista 

- CRUD completo (obtener listado, crear, editar, eliminar)
- Obtener entrevista por ID
- Obtener listado de entrevistas con paginación
- Obtener entrevistas por proceso
- Buscar entrevistas por nombre de postulante
- Buscar entrevistas por apellido de postulante
- Buscar entrevistas por rol 
- Buscar entrevistas por célula 
- Buscar entrevistas por fecha 

### Pregunta

- CRUD completo (obtener listado, crear, editar, eliminar)
- Obtener pregunta por ID
- Obtener preguntas por rol 
- Crear múltiples preguntas

### Respuesta

- CRUD completo (obtener listado, crear, editar, eliminar)
- Obtener respuesta por ID
- Obtener respuestas de entrevista 
- Crear múltiples respuestas
- Actualizar respuestas de entrevista

### Estadísticas 

- Entrevistas por mes 
- Procesos por mes 

### Etapa 

- Obtener etapas 
- Obtener etapa por ID 

### Etapa de proceso

- Obtener etapas de procesos 
- Obtener etapas de procesos con detalle 
- Obtener etapa de proceso por ID 
- Agregar etapa a un proceso 

### Rol de usuario 

- Obtener roles de usuario 

### Usuario

- Crear usuario 
- Editar usuario 
- Obtener usuarios 
- Buscar usuario por ID 
- Login de usuario 
- Checkeo de token JWT 