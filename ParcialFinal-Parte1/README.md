# MiniWebApp

## Descripción

Este proyecto utiliza Docker y Docker Compose para levantar una aplicación web con Flask, Nginx y MySQL.

---

## Requisitos previos

- Docker
- Docker Compose

---

## Pasos para el despliegue

### 1. Clonar el repositorio

Clona el repositorio y navega a la carpeta del proyecto.

### 2. Verificar dependencias

Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

### 3. Certificados SSL

Genera los certificados SSL si no existen en `nginx/certs/`.

### 4. Levantar los servicios

Ejecuta el siguiente comando en la raíz del proyecto:

   ```
   docker-compose up --build
   ```

   Esto construirá y levantará los contenedores de la base de datos MySQL, la aplicación Flask y el proxy Nginx. La base de datos se inicializa automáticamente con los datos definidos en `mysql/init.sql`.

### 5. Acceso a la aplicación

Abre tu navegador y accede a:

   - https://localhost

### 6. Detener los servicios

Para detener los servicios, ejecuta:

   ```
   docker-compose down
   ```

---

## Notas

No es necesario realizar configuraciones adicionales. Todos los servicios se comunican entre sí mediante la red interna de Docker.
