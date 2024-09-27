# Utiliza una imagen oficial de Node.js para compilar el frontend
FROM node:18 as build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias que se encuentran en el package.json
RUN npm install  

# Copia el código de la aplicación
COPY . .

# Construye la aplicación Angular
RUN npm run build

# Segunda etapa: Utiliza una imagen de nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos de build generados por Angular a nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para nginx
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
