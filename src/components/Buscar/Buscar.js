import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./buscar.css";

const Buscar = () => {
  const [partidos, setPartidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filtro, setFiltro] = useState("");
  const itemsPerPage = 9;

  const urls = {
    masValoracion: "http://localhost:3000/api/usuarios/partidosPorValoracion",
    masMinutos: "http://localhost:3000/api/usuarios/partidosPorMinutos",
    masPuntos: "http://localhost:3000/api/usuarios/partidosPorPuntos",
    masAsistencias: "http://localhost:3000/api/usuarios/partidosPorAsistencias",
    masRebotes: "http://localhost:3000/api/usuarios/partidosPorRebotes",
  };

  // Traer el total de páginas basado en el filtro
  /*const traerTotalPaginas = async () => {
    console.log("traerTotalPaginas", filtro);
    try {
      console.log("fetchPartidos", filtro);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No se proporcionó el token de autenticación");

      const response = await fetch(`/cantidadPartidos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (typeof data.partidos === "number") {
        const paginas = Math.ceil(data.partidos / itemsPerPage);
        setTotalPages(paginas);
      } else {
        console.error("Respuesta inválida al obtener el total de partidos:", data);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error al obtener la cantidad de páginas:", error);
      setTotalPages(0);
    }
  };*/
  const traerCant = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token)
        throw new Error("No se proporcionó el token de autenticación");

      const response = await fetch(
        "http://localhost:3000/api/usuarios/cantidadPartidos",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const paginas = Math.ceil(data.partidos / itemsPerPage);
      setTotalPages(paginas);
    } catch (error) {
      console.error("Error al obtener la cantidad de páginas:", error);
      setTotalPages(1);
    }
  };
  // Función para obtener los partidos
  const fetchPartidos = async (url, page) => {
    console.log("fetchPartidos", url, page);
    try {
      const token = localStorage.getItem("token");
      if (!token)
        throw new Error("No se proporcionó el token de autenticación");

      const response = await fetch(`${url}/${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (Array.isArray(data.partidos)) {
        console.log("data", data.partidos);
        setPartidos(data.partidos);
      } else {
        console.error("La respuesta no contiene un array en 'partidos':", data);
        setPartidos([]);
      }
    } catch (error) {
      console.error("Error al obtener los partidos:", error);
      setPartidos([]);
    }
  };

  // Cambiar filtro
  const cambiarFiltro = async (nuevoFiltro, url) => {
    setFiltro(nuevoFiltro);
    setCurrentPage(1); // Reiniciar a la primera página
    await traerCant(); // Obtener la cantidad de páginas
    fetchPartidos(url, 1); // Obtener la primera página de resultados
  };

  // Cambiar de página
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && filtro) {
      setCurrentPage(pageNumber);
    }
  };

  // Actualizar los partidos al cambiar de página
  useEffect(() => {
    if (filtro) {
      const url = urls[filtro];
      fetchPartidos(url, currentPage);
    }
  }, [currentPage]);

  return (
    <div>
      <NavBar />
      <h1>Buscar partido</h1>

      <div className="filtrosContainer">
        <button
          onClick={() => cambiarFiltro("masValoracion", urls.masValoracion)}
        >
          Más valoración
        </button>
        <button onClick={() => cambiarFiltro("masMinutos", urls.masMinutos)}>
          Más minutos
        </button>
        <button onClick={() => cambiarFiltro("masPuntos", urls.masPuntos)}>
          Más puntos
        </button>
        <button
          onClick={() => cambiarFiltro("masAsistencias", urls.masAsistencias)}
        >
          Más asistencias
        </button>
        <button onClick={() => cambiarFiltro("masRebotes", urls.masRebotes)}>
          Más rebotes
        </button>
      </div>

      <h2>Filtrando partidos de mayor a menor según {filtro}</h2>

      <div className="partidosContainer">
        {partidos.map((partido, index) => (
          <div key={partido.id} className="partidoItem">
            <p>{index + 1 + (currentPage - 1) * itemsPerPage}</p>
            <p>Minutos: {partido.estadisticas.minutosJugados}</p>
            <p>Puntos: {partido.estadisticas.puntos}</p>
            <p>Asistencias: {partido.estadisticas.asistencias}</p>
            <p>
              Rebotes:{" "}
              {partido.estadisticas.rebotesDefensivos +
                partido.estadisticas.rebotesOfensivos}
            </p>
            <p>Valoración: {partido.estadisticas.valoracion}</p>
            <hr />
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1 || !filtro}
        >
          Anterior
        </button>
        <span className="pagination-info">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="pagination-btn"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || !filtro}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Buscar;
