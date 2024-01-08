# RecruitmentPlatform3IT
3IT Recruitment es una plataforma que permite registrar las entrevistas técnicas de los postulantes, independiente del perfil al cual postule.

## Requisitos Previos

- [Node](https://nodejs.org/en)
- [MySQL](https://dev.mysql.com/downloads/workbench/)

## Ejecución del Proyecto

- Clonar el repositorio:
```bash
git clone https://github.com/jacobvegatoro/3it-recruitment-backend-nodejs.git
```

- Ejecutar script `script-recruitmentdb.sql`
- Configura tus datos de conexión en el archivo `database.js`
- Instalar dependencias `npm install`
- Iniciar el proyecto `npm start` 


## Endpoints:

### Postulante
CRUD completo (obtener listado, crear, editar, eliminar) más:

- Obtener postulante por ID
- Obtener listado de postulantes con paginación
- Obtener postulante por búsqueda de palabra clave

### Cliente 

- Obtener cliente por ID
- Obtener células asociadas a cliente específico
- Obtener listado de clientes

### Célula 

- Obtener célula por ID
- Obtener listado de células

### Rol 

- Obtener listado de roles
- Crear nuevo rol

### Proceso
CRUD completo (obtener listado, crear, editar, eliminar) más:

- Obtener proceso por ID

### Entrevista 
CRUD completo (obtener listado, crear, editar, eliminar) más:

- Obtener entrevista por ID
- Obtener listado de entrevistas con paginación

### Pregunta
CRUD completo (obtener listado, crear, editar, eliminar) más:

- Obtener pregunta por ID
- (en proceso) Crear múltiples preguntas

