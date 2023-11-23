# RecruitmentPlatform3IT
3IT Recruitment es una plataforma que permite registrar las entrevistas técnicas de los postulantes, independiente del perfil al cual postule.

## Requisitos Previos

- [Node 18.18.1](https://nodejs.org/en)
- [MySQL](https://dev.mysql.com/downloads/workbench/)

## Ejecución del Proyecto

- Clonar el repositorio:
```bash
git clone https://github.com/nicoleOpazo/RecruitmentPlatform3IT
```

- Ejecutar script `script-recruitmentdb.sql`
- Configura tus datos de conexión en el archivo `database.js`
- Instalar dependencias `npm install`
- Iniciar el proyecto `npm start` 


## Endpoints:

### Crear Postulante (POST)
- URL: http://localhost:5000/postulantes
- Método: POST
- Ejemplo de JSON de Solicitud:
```json
{
  "nombres": "Nombre Postulante",
  "apellidos": "Apellido Postulante",
  "ciudad": "Ciudad Ejemplo",
  "enlaceBizneo": "http://bizneo.com"
}
```

### Obtener listado de Postulantes (GET)
- URL: http://localhost:5000/postulantes
- Método: GET

### Obtener Postulante por ID (GET)
- URL: http://localhost:5000/postulantes/{id}
- Método: GET

### Editar Postulante (PUT)
- URL: http://localhost:5000/postulantes/{id}
- Método: PUT
- Ejemplo de JSON de Solicitud:
```json
{
    "nombres": "EDIT Nombre Postulante",
    "apellidos": "Apellido Postulante",
    "ciudad": "Ciudad Ejemplo",
    "enlaceBizneo": "http://bizneo.com"
}
```

### Eliminar Postulante (DELETE)
- URL: http://localhost:5000/postulantes/{id}
- Método: DELETE
