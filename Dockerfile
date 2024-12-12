# Usar una imagen base de Node.js
FROM node:18-bullseye

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar todas las dependencias
RUN npm install --legacy-peer-deps --include=dev

# Verificar que react-scripts esté instalado
RUN npm list react-scripts

# Copiar el resto del código fuente al contenedor
COPY . .

RUN npm install -g react-scripts
# Ejecutar los tests
RUN npm test -- --ci --runInBand --coverage

# Deshabilitar ESLint si es necesario
ENV DISABLE_ESLINT_PLUGIN=true

# Construir la aplicación
RUN npm run build

# Instalar un servidor estático para servir la aplicación React
RUN npm install -g serve

# Exponer el puerto 3000 para la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD ["serve", "-s", "build", "-l", "3000"]
