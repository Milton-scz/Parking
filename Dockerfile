# Etapa 1: Construcción de la aplicación Angular
FROM node:19.6.0

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 4200

# Comando por defecto para ejecutar ng serve
CMD ["npm", "run", "start"]
