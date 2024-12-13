# Etapa 1: Instalación de dependencias y ejecución de tests
FROM node:18-bullseye AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar todas las dependencias
RUN npm install --legacy-peer-deps --include=dev

# Verificar que react-scripts esté instalado
RUN npm list react-scripts

# Copiar el resto del código fuente
COPY . .

# Instalar react-scripts globalmente
RUN npm install -g react-scripts

# Ejecutar los tests
RUN npm test -- --ci --watchAll=false --coverage

# Deshabilitar ESLint si es necesario
ENV DISABLE_ESLINT_PLUGIN=true

# Construir la aplicación
RUN npm run build

# Etapa 2: Crear la imagen final minimalista
FROM node:18-bullseye AS production

# Instalar un servidor estático para servir la aplicación React
RUN npm install -g serve

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo la carpeta de construcción desde la etapa anterior
COPY --from=build /app/build ./build

# Exponer el puerto 3000 para la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD ["serve", "-s", "build", "-l", "3000"]
