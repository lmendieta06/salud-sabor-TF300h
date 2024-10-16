# Salud y Sabor - Plataforma de Restaurantes Saludables

## Descripción del Proyecto

**Salud y Sabor** es una plataforma diseñada para ayudar a personas con necesidades alimenticias especiales, como veganos, vegetarianos, personas con estilo de vida *fit* o con condiciones médicas como la diabetes, a encontrar restaurantes que se ajusten a sus necesidades. Desarrollado por **Laura Mendieta** (Desarrolladora y Scrum Master) y **Gabriel Betancourt** (Desarrollador y Product Owner), el proyecto tiene como objetivo facilitar el acceso a una alimentación saludable.

## Tecnologías Utilizadas

Este proyecto está compuesto por dos partes: un backend desarrollado con **Node.js** y **Express**, y un frontend en **Angular**. Todo el sistema ha sido desplegado en **Digital Ocean** usando **Docker** para la virtualización y manejo de contenedores.

### Backend

El **backend** proporciona una API para gestionar la interacción entre usuarios y la base de datos de restaurantes. Las principales dependencias son:

- **bcryptjs**: Para el cifrado de contraseñas de manera segura.
- **jsonwebtoken**: Maneja la autenticación de usuarios mediante tokens JWT.
- **mongoose**: Una biblioteca para modelar datos de MongoDB en el proyecto.
- **multer**: Para manejar la carga de archivos (como imágenes de los restaurantes).
- **dotenv**: Gestiona las variables de entorno de manera segura, como claves API o conexiones de base de datos.

#### Comandos útiles para backend:

- Iniciar en modo producción: `npm run start`
- Iniciar en modo desarrollo (con reinicios automáticos): `npm run dev`

### Frontend

El **frontend** ha sido desarrollado utilizando **Angular** y permite a los usuarios navegar por la lista de restaurantes, filtrar según sus necesidades alimentarias, y obtener recomendaciones personalizadas. Algunas dependencias clave incluyen:

- **ngx-echarts**: Utilizado para la visualización de gráficos interactivos y dinámicos.
- **jwt-decode**: Decodifica los tokens JWT recibidos desde el backend.
- **aos**: Añade animaciones de desplazamiento para mejorar la experiencia del usuario.
- **sweetalert2**: Proporciona alertas y ventanas emergentes con un diseño moderno y personalizable.

#### Comandos útiles para frontend:

- Iniciar el servidor de desarrollo (construcción automática de la página): `ng serve -o`

## Pruebas de Acceso

Para probar la funcionalidad como administrador, puedes usar las siguientes credenciales:

- **Correo**: adminprueba@gmail.com
- **Contraseña**: 12345

## Requisitos Previos

Antes de iniciar, asegúrate de tener instalados los siguientes programas:

- **Node.js**: Para gestionar el servidor y ejecutar las aplicaciones de backend.
- **Angular CLI**: Para gestionar el frontend.
- **Express**: Framework de Node.js para construir APIs rápidas y seguras.
- **Dependencias**: Ejecutar `npm install` tanto en el backend como en el frontend para instalar todas las dependencias listadas en los archivos `package.json`.

## Despliegue

El proyecto ha sido desplegado en **Digital Ocean**, una plataforma de *cloud computing* que permite a los desarrolladores desplegar y escalar aplicaciones fácilmente mediante servidores virtuales llamados *droplets*. Utilizamos **Docker** para contenerizar las aplicaciones y asegurar que se ejecuten de manera consistente en cualquier entorno.

Para visualizar la página, puedes acceder a la siguiente URL:

[http://159.223.114.19/](http://159.223.114.19/)  
(*Nota*: El funcionamiento de esta dirección puede variar dependiendo del estado del servidor).
