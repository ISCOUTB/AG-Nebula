# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el código de la aplicación al contenedor
COPY . .

# Construir la aplicación en modo producción
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar la aplicación en modo producción
CMD ["npm", "run", "start"]



