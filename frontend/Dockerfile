# Versión de NODE estable
FROM node:24.11.0
# Creamos directorio donde se almacenara la app
WORKDIR /app
# Copiamos nuestro archivo de package json primero
COPY package*.json ./ 
# Se instalan librerias de node en docker 
RUN npm install
# Se copia todo al contenedor
COPY . .
# El pueto que tendra el React
EXPOSE 5173
# Comando por a ejecutar por consola dentro del contenedor
CMD ["npm","run","dev","--","--host"]

