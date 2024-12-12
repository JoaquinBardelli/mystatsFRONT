import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom'; // Agrega esto
import Inicio from "./components/Inicio/Inicio.js";

test("renders Inicio component correctly", () => {
  render(
    <Router> {/* Asegúrate de envolver el componente en Router */}
      <Inicio />
    </Router>
  );
  expect(screen.getByText(/personaje/i)).toBeInTheDocument();
});
