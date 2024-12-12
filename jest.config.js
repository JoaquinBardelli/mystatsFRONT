module.exports = {
    // Usa jsdom para simular el entorno del navegador
    testEnvironment: "jsdom",
  
    // Extiende las capacidades de Jest con testing-library
    setupFilesAfterEnv: [
      "@testing-library/jest-dom/extend-expect", // Corregir la ruta, no es necesario especificar './node_modules/'
    ],
  
    // Mapeo de módulos para resolver correctamente react-router-dom
    moduleNameMapper: {
      "^react-router-dom$": "react-router-dom", // Ajusta para que resuelva directamente el paquete
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Maneja estilos en tests (si es necesario)
    },
  
    // Ignora transformaciones de node_modules excepto react-router-dom

    // Opcional: indicar directorios raíz de los tests
    roots: ["<rootDir>/src"],
  
    // Otras configuraciones si necesitas simular comportamientos de react-router-dom
    jest: {
      // Simula NavLink para evitar errores de tests con este componente
      setupFiles: ["<rootDir>/jest.setup.js"],
    }
  };
  