# Usa una imagen oficial de Node
FROM node:18-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el código de la aplicación
COPY . .

# Comando para correr Angular en modo desarrollo
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]