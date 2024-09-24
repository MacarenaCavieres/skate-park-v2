# Skate Park 🛹

Este proyecto es una aplicación web para la gestión de skaters y administradores, que incluye registro, inicio de sesión, gestión de datos de skaters, y roles administrativos. Se utiliza Node.js, Express.js, Handlebars como motor de vistas, y PostgreSQL como base de datos. También se usa bcryptjs para el manejo de contraseñas y jsonwebtoken para la autenticación.


## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework para manejar rutas y controladores.
- **Handlebars**: Motor de plantillas para renderizar vistas.
- **bcryptjs**: Librería para encriptar contraseñas.
- **jsonwebtoken (JWT)**: Para la autenticación mediante tokens.
- **PostgreSQL**: Base de datos relacional.
- **dotenv**: Para la gestión de variables de entorno.
- **express-fileupload**: Para manejar la subida de imágenes.

## Funcionalidades

### Skaters
1. **Registro de Skaters**: Un skater puede registrarse proporcionando su nombre, email, contraseña, experiencia, especialidad y una foto.
2. **Inicio de Sesión**: Autenticación mediante email y contraseña.
3. **Actualización de Perfil**: Un skater puede actualizar su perfil, incluyendo su contraseña.
4. **Eliminación de Cuenta**: Los skaters pueden eliminar su cuenta si desean.
5. **Cambio de Estado**: Actualización del estado de un skater (activo/inactivo) por parte de un administrador.

### Administradores
1. **Registro de Administradores**: Los administradores pueden registrarse con un nombre de usuario, email y contraseña.
2. **Inicio de Sesión de Administradores**: Autenticación mediante email y contraseña para administradores.
3. **Gestión de Skaters**: Los administradores pueden ver y administrar la lista de skaters.
4. **Gestión de Administradores**: Los administradores pueden actualizar o eliminar su propia cuenta y gestionar otros administradores.

## Instalación y configuración

### Requisitos previos
- Node.js 14.x o superior
- PostgreSQL 12.x o superior

### Instrucciones

1. Clonar el repositorio:
```bash
git clone https://github.com/MacarenaCavieres/skate-park-v2
```

2. Instalar dependencias:
```bash
npm install
```
3. Configurar las variables de entorno creando un archivo .env en la raíz del proyecto:
```bash
touch .env
```
En el archivo .env, agregar las siguientes variables:

```env
secretKey=your_secret_key
DATABASE_URL=your_database_url
```

4. Ejecutar las migraciones SQL para crear las tablas en la base de datos:

    - Usa los archivos SQL proporcionados en el proyecto para crear las tablas skaters, admin, y roles.

5. Ejecutar la aplicación:

```bash
npm start
```

6. Abrir la aplicación en http://localhost:3000

## Endpoints principales

### Skaters
- **POST** /register/skater: Registro de un nuevo skater.
- **POST** /login: Inicio de sesión de un skater.
- **GET** /data: Obtener la información de un skater autenticado.
- **PUT** /skater/update: Actualización del perfil de un skater.
- **DELETE** /skater/delete: Eliminación de un skater.

### Administradores
- **POST** /auth: Inicio de sesión de un administrador.
- **GET** /data: Obtener la información de un administrador autenticado.
- **POST** /register: Registro de un nuevo administrador.
- **PUT** /update: Actualización del perfil de un administrador.
- **DELETE** /delete: Eliminación de un administrador.

## Estructura del proyecto

```bash
skaters-app/
│
├── controllers/         # Lógica de negocio
├── database/            # Gestión de errores y configuración de la base de datos
├── middlewares/         # Configuración de middlewares
├── models/              # Definición de modelos de Skaters y Administradores
├── public/              # Archivos estáticos (imágenes, estilos, etc.)
├── routes/              # Rutas de la API y vistas
├── utils/               # Configuraciones adicionales (subida de archivos, etc.)
├── views/               # Plantillas Handlebars
├── .env                 # Variables de entorno (ignorado por Git)
├── index.js            # Punto de entrada de la aplicación
└── README.md            # Este archivo
```

## Desarrollo

Desarrollado por [MCavieres](https://www.linkedin.com/in/macarena-cavieres-rubio/)