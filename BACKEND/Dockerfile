# Usa la imagen oficial de Node.js como base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Copia el archivo .env para utilizar variables de entorno en Docker
COPY .env

# Expone el puerto que utiliza la aplicación (ajustar si es necesario)
EXPOSE 2000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
