import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./agregar.css";

const Agregar = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    equipoRival: "",
    fecha: "",
    puntosFavor: "",
    puntosContra: "",
    minutosJugados: "",
    segundosJugados: "",
    puntosConvertidos: "",
    rebotesOfensivos: "",
    rebotesDefensivos: "",
    asistencias: "",
    faltasCometidas: "",
    faltasRecibidas: "",
    taponesCometidos: "",
    taponesRecibidos: "",
    balonesPerdidos: "",
    recuperaciones: "",
    valoracion: "",
    tirosDeCampo: "",
    tirosDeCampoConvertidos: "",
    tirosDeDos: "",
    tirosDeDosConvertidos: "",
    tirosDeTres: "",
    tirosDeTresConvertidos: "",
    tirosLibres: "",
    tirosLibresConvertidos: "",
  });

  // Estado para los equipos
  const [equipos, setEquipos] = useState([]);

  // Cargar equipos cuando el componente se monta
  useEffect(() => {
    traerFederacion();
  }, []);

  // Función para cargar la federación y obtener los equipos
  const traerFederacion = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se proporcionó el token de autenticación");
        return;
      }
      const response = await fetch(
        "http://localhost:3000/api/usuarios/federacion",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.federacion && data.federacion.clubes) {
        setEquipos(data.federacion.clubes);
      } else {
        console.error("No se encontraron equipos.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    let cantPartidos = 0;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se proporcionó el token de autenticación");
        return;
      }
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
      cantPartidos = data.partidos || 0;
      console.log("Cantidad de partidos:", cantPartidos);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    const partidoData = {
      partidos: {
        id: cantPartidos + 1,
        fecha: formData.fecha,
        adversario: formData.equipoRival,
        puntosPropioClub: formData.puntosFavor,
        puntosAdversario: formData.puntosContra,
        estadisticas: {
          minutosJugados: formData.minutosJugados,
          segundosJugados: formData.segundosJugados,
          puntos: formData.puntosConvertidos,
          rebotesOfensivos: formData.rebotesOfensivos,
          rebotesDefensivos: formData.rebotesDefensivos,
          asistencias: formData.asistencias,
          faltasCometidas: formData.faltasCometidas,
          faltasRecibidas: formData.faltasRecibidas,
          taponesRecibidos: formData.taponesRecibidos,
          taponesCometidos: formData.taponesCometidos,
          perdidas: formData.perdidas,
          recuperaciones: formData.recuperaciones,
          valoracion: formData.valoracion,
          tiros: {
            tirosDeCampo: formData.tirosDeCampo,
            tirosDeCampoConvertidos: formData.tirosDeCampoConvertidos,
            tirosDeDos: formData.tirosDeDos,
            tirosDeDosConvertidos: formData.tirosDeDosConvertidos,
            tirosDeTres: formData.tirosDeTres,
            tirosDeTresConvertidos: formData.tirosDeTresConvertidos,
            tirosLibres: formData.tirosLibres,
            tirosLibresConvertidos: formData.tirosLibresConvertidos,
          },
        },
      },
    };

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:3000/api/usuarios/agregarPartido",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(partidoData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Partido agregado con éxito:", data);
      } else {
        const errorData = await response.json();
        console.error("Error al agregar el partido:", errorData);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="agregarContainer">
        <form onSubmit={handleSubmit}>
          <div className="formStatsContainer">
            <label className="labelTitle">Datos partido</label>
            <div className="inputRow">
              <div className="inputContainer">
                <label htmlFor="equipoRival">Equipo rival</label>
                <select
                  id="equipoRival"
                  name="equipoRival"
                  value={formData.equipoRival}
                  onChange={handleChange}
                >
                  <option value="">--Selecciona un equipo--</option>
                  {equipos.length > 0 &&
                    equipos.map((equipo, index) => (
                      <option key={index} value={equipo}>
                        {equipo}
                      </option>
                    ))}
                </select>
              </div>
              <div className="inputContainer">
                <label htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="puntosFavor">Puntos a favor</label>
                <input
                  type="number"
                  id="puntosFavor"
                  name="puntosFavor"
                  placeholder="Puntos a favor"
                  value={formData.puntosFavor}
                  onChange={handleChange}
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="puntosContra">Puntos en contra</label>
                <input
                  type="number"
                  id="puntosContra"
                  name="puntosContra"
                  placeholder="Puntos en contra"
                  value={formData.puntosContra}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="formStatsContainer">
            {" "}
            <label className="labelTitle">Estadísticas jugador</label>{" "}
            <div className="inputRow">
              {" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="minutosJugados">Minutos jugados</label>{" "}
                <input
                  type="number"
                  id="minutosJugados"
                  name="minutosJugados"
                  placeholder="Minutos jugados"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="segundosJugados">Segundos jugados</label>{" "}
                <input
                  type="number"
                  id="segundosJugados"
                  name="segundosJugados"
                  placeholder="Segundos jugados"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="puntosConvertidos">
                  Puntos convertidos
                </label>{" "}
                <input
                  type="number"
                  id="puntosConvertidos"
                  name="puntosConvertidos"
                  placeholder="Puntos convertidos"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="rebotesOfensivos">Rebotes ofensivos</label>{" "}
                <input
                  type="number"
                  id="rebotesOfensivos"
                  name="rebotesOfensivos"
                  placeholder="Rebotes ofensivos"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
            </div>{" "}
            <div className="inputRow">
              {" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="rebotesDefensivos">
                  Rebotes defensivos
                </label>{" "}
                <input
                  type="number"
                  id="rebotesDefensivos"
                  name="rebotesDefensivos"
                  placeholder="Rebotes defensivos"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="asistencias">Asistencias</label>{" "}
                <input
                  type="number"
                  id="asistencias"
                  name="asistencias"
                  placeholder="Asistencias"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="faltasCometidas">Faltas cometidas</label>{" "}
                <input
                  type="number"
                  id="faltasCometidas"
                  name="faltasCometidas"
                  placeholder="Faltas cometidas"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="faltasRecibidas">Faltas recibidas</label>{" "}
                <input
                  type="number"
                  id="faltasRecibidas"
                  name="faltasRecibidas"
                  placeholder="Faltas recibidas"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="taponesCometidos">Tapones cometidos</label>{" "}
                <input
                  type="number"
                  id="taponesCometidos"
                  name="taponesCometidos"
                  placeholder="Tapones cometidos"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="taponesRecibidos">Tapones recibidos</label>{" "}
                <input
                  type="number"
                  id="taponesRecibidos"
                  name="taponesRecibidos"
                  placeholder="Tapones recibidos"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="perdidas">Perdidas</label>{" "}
                <input
                  type="number"
                  id="perdidas"
                  name="perdidas"
                  placeholder="Perdidas"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="recuperaciones">Recuperaciones</label>{" "}
                <input
                  type="number"
                  id="recuperaciones"
                  name="recuperaciones"
                  placeholder="Recuperaciones"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="valoracion">Valoración</label>{" "}
                <input
                  type="number"
                  id="valoracion"
                  name="valoracion"
                  placeholder="Valoración"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="formStatsContainer">
            {" "}
            <label className="labelTitle">Estadísticas tiros</label>{" "}
            <div className="inputRow">
              {" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="tirosDeCampo">Tiros de campo</label>{" "}
                <input
                  type="number"
                  id="tirosDeCampo"
                  name="tirosDeCampo"
                  placeholder="Tiros de campo"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="tirosDeCampoConvertidos">
                  {" "}
                  Tiros de campo convertidos{" "}
                </label>{" "}
                <input
                  type="number"
                  id="tirosDeCampoConvertidos"
                  name="tirosDeCampoConvertidos"
                  placeholder="Tiros de campo convertidos"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="tirosDeDos">Tiros de dos</label>{" "}
                <input
                  type="number"
                  id="tirosDeDos"
                  name="tirosDeDos"
                  placeholder="Tiros de dos"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="tirosDeDosConvertidos">
                  {" "}
                  Tiros de dos convertidos{" "}
                </label>{" "}
                <input
                  type="number"
                  id="tirosDeDosConvertidos"
                  name="tirosDeDosConvertidos"
                  placeholder="Tiros de dos convertidos"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
            </div>{" "}
            <div className="inputRow">
              {" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="tirosDeTres">Tiros de tres</label>{" "}
                <input
                  type="number"
                  id="tirosDeTres"
                  name="tirosDeTres"
                  placeholder="Tiros de tres"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="tirosDeTresConvertidos">
                  {" "}
                  Tiros de tres convertidos{" "}
                </label>{" "}
                <input
                  type="number"
                  id="tirosDeTresConvertidos"
                  name="tirosDeTresConvertidos"
                  placeholder="Tiros de tres convertidos"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="tirosLibres">Tiros libres</label>{" "}
                <input
                  type="number"
                  id="tirosLibres"
                  name="tirosLibres"
                  placeholder="Tiros libres"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
              <div className="inputContainer">
                {" "}
                <label htmlFor="tirosLibresConvertidos">
                  {" "}
                  Tiros libres convertidos{" "}
                </label>{" "}
                <input
                  type="number"
                  id="tirosLibresConvertidos"
                  name="tirosLibresConvertidos"
                  placeholder="Tiros libres convertidos"
                  onChange={handleChange}
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <button className="formAgregarBtn" type="submit">
            Agregar partido
          </button>
        </form>
      </div>
    </div>
  );
};

export default Agregar;
