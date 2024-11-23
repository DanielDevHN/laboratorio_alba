# API - Patient Management Documentation

Esta API permite gestionar pacientes, sintomas y las relaciones entre pacientes y sintomas, y está construida en Express.js, utilizando TypeORM para conectar y gestionar una base de datos MongoDB y Swagger para la documentación de la API.

## Tecnologías Usadas

- **Express**: Framework para construir la API.
- **MongoDB**: Base de datos relacional para almacenar los datos.
- **TypeORM**: ORM para interactuar con la base de datos MongoDB.
- **Cors**: Middleware para habilitar CORS en la API.
- **JWT**: Para generar token de usuario.
- **Swagger JSDoc y Swagger UI**: Para documentar y visualizar la API.
- **Dotenv**: Para gestionar las variables de entorno, incluida la cadena de conexión a la base de datos.

## Pre-requisitos

- Node.js (versión 14 o superior)
- Git

## Estructura del Proyecto
```
📦src 
 ┣ 📂application
 ┣ 📂domain
 ┣ 📂infrastructure
 ┣ 📂interfaces
 ┣ 📂shared
 ┣ 📜main.ts
 ┣ 📜server.ts
 ┣ 📜.env.example
 ┣ 📜package.json
 ┣ 📜swagger.json
 ┗ 📜README.md
 ```

## Configuración del Ambiente Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local.

### Paso 1: Clonar el Repositorio

Ejecuta el siguiente comando en tu terminal para clonar el repositorio:

```
git clone https://github.com/DanielDevHN/laboratorio_alba.git
```

### Paso 2: Instalar Dependencias

Navega a la carpeta del proyecto e instala las dependencias:

```
cd tu_repositorio
npm install
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo .env en la raíz del proyecto y define la cadena de conexión para la base de datos MongoDB. Aquí tienes un ejemplo:

```
MONGO_URI="your mongodb uri"
```
Nota:: En el repositorio encontraras un archivo .env.example el cual puedes usar para crear tu .env

### Paso 4: Ejecutar el Servidor

Inicia el servidor en modo de desarrollo:

```
npm run dev
```

El servidor debería iniciar en http://localhost:3000 de manera predeterminada.

## Documentación de la API con Swagger

La documentación de la API está disponible en:

http://localhost:3000/swagger

## Endpoints de la API

### Patients

- **GET /patients**: Obtener lista de pacientes
- **GET /patients/{id}**: Obtener un paciente por su ID
- **POST /patients**: Crear un nuevo paciente
- **PATCH /patients/{id}**: Actualizar un paciente por su ID
- **DELETE /patients/{id}**: Eliminar un paciente por su ID

### Symptoms

- **GET /symptoms**: Obtener lista de sintomas
- **POST /symptoms**: Crear un nuevo sintoma
- **PATCH /symptoms/{id}**: Actualizar un sintoma por su ID
- **DELETE /symptoms/{id}**: Eliminar un sintoma por su ID

### Patient-Symptoms

- **GET /patients/{patientID}/symptoms**: Obtener lista de realciones entre pacientes y sintomas
- **POST /patients/{patientID}/symptoms/{symptomID}**: Crear una relacion entre un paciente y sintoma
- **DELETE /patients/{patientID}/symptoms/{symptomID}**: Eliminar una relacion entre un paciente y sintoma

Consulta la documentación en Swagger para obtener detalles sobre los parámetros y las respuestas de cada endpoint.