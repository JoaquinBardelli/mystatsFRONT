// jest.setup.js
import { jest } from '@jest/globals';
import React from 'react';

// Simula NavLink para evitar errores de tests con este componente
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantén los comportamientos reales de otros componentes
  NavLink: ({ children }) => <div>{children}</div>, // Simula NavLink como un simple <div>
}));
