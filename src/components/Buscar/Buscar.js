import React from "react";
import NavBar from '../NavBar/NavBar';
import './buscar.css';
const Buscar = () => {
    return (
        <div>
            <NavBar />
            <h1>Buscar partido</h1>
            <div className="filtrosContainer">
            <button>Por fecha</button>
            <button>Más valoración</button>
            <button>Más minutos</button>
            <button>Más puntos</button>
            <button>Más asistencias</button>
            <button>Más rebotes</button>
            </div>
        </div>
    );
}

export default Buscar;