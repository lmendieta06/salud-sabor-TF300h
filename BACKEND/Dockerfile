# Dockerfile para Node + Express
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

# Comando para ejecutar la aplicación
CMD ["npm", "start"]