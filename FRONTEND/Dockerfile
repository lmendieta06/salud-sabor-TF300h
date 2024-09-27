# Utiliza una imagen oficial de Node.js para compilar el frontend
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Construye la aplicación Angular
RUN npm install -g @angular/cli

# Instala las dependencias que se encuentran en el package.json
RUN npm install  

# Copia el código de la aplicación
COPY . .

# Comando para iniciar nginx
CMD ["ng", "serve", "-o"]
