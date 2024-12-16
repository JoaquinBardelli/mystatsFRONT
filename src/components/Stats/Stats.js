import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./stats.css";
// Importaciones para Chart.js
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LineElement,
  PointElement,
} from "chart.js";

// Configuración para habilitar gráficos en Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LineElement,
  PointElement
);

const Stats = () => {
  const [promedio, setPromedio] = useState({
    minutosJugados: 0,
    segundosJugados: 0,
    puntos: 0,
    rebotesOfensivos: 0,
    rebotesDefensivos: 0,
    asistencias: 0,
    perdidas: 0,
    recuperaciones: 0,
    faltasCometidas: 0,
    faltasRecibidas: 0,
    taponesCometidos: 0,
    taponesRecibidos: 0,
    valoracion: 0,
    tiros: {
      tirosDeCampo: 0,
      tirosDeCampoConvertidos: 0,
      tirosDeDos: 0,
      tirosDeDosConvertidos: 0,
      tirosDeTres: 0,
      tirosDeTresConvertidos: 0,
      tirosLibres: 0,
      tirosLibresConvertidos: 0,
    },
  });
  const [datosUser, setDatosUser] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    club: "",
    dorsal: "",
    altura: "",
    peso: "",
  });

  const [cantPartidos, setCantPartidos] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtener el token JWT desde localStorage
    console.log("Entro a cantidad partidos");
    fetch("http://host.docker.internal:3000/api/usuarios/cantidadPartidos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No autorizado");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Cantidad de partidos", data.partidos);
        setCantPartidos(data.partidos);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtener el token JWT desde localStorage
    console.log("Entro a promedio");
    console.log(token);
    fetch("http://host.docker.internal:3000/api/usuarios/promedio", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No autorizado");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.promedio);
        setPromedio(data.promedio);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtener el token JWT desde localStorage

    fetch("http://host.docker.internal:3000/api/usuarios/traerDatos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No autorizado");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.datos);
        setDatosUser(data.datos);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // console.log(datosUser.nacimiento.split('T')[0]);
  // datosUser.nacimiento = datosUser.nacimiento.split('T')[0];
  return (
    <div>
      <NavBar />
      <div className="statsContainer">
        <div className="playerContainer">
          <div className="playerText">
            <div className="present">
              <h1>
                {datosUser.nombre} {datosUser.apellido}
              </h1>
              <form
                action="/upload"
                method="post"
                enctype="multipart/form-data"
              >
                <label htmlFor="imagen">Elige una imagen:</label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  accept="image/*"
                ></input>
                <button type="submit">Subir Imagen</button>
              </form>
            </div>
            <div className="moreDetailCont">
              <div className="ultraDetail">
                <p>HT/HW: </p>
                <p>Nacimiento:</p>
                <p>Club: </p>
                <p>Dorsal: </p>
              </div>
              <div className="ultraDetail">
                <p>
                  <b>
                    {datosUser.altura}cm/{datosUser.peso}kg
                  </b>
                </p>
                <p>
                  <b>{datosUser.nacimiento} </b>
                </p>
                <p>
                  <b>{datosUser.club}</b>
                </p>
                <p>
                  <b>{datosUser.dorsal}</b>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="statsColumn topRow">
            <div>
              <p className="statsDivTitle">Partidos</p>
              <p className="statsDivInfo">{cantPartidos}</p>
            </div>
            <div>
              <p className="statsDivTitle">Minutos</p>
              <p className="statsDivInfo">
                {promedio.minutosJugados.toFixed(1)}
              </p>{" "}
              {/* Redondeado a 1 decimal */}
            </div>
            <div>
              <p className="statsDivTitle">Puntos</p>
              <p className="statsDivInfo">{promedio.puntos.toFixed(1)}</p>{" "}
              {/* Redondeado a 1 decimal */}
            </div>
            <div>
              <p className="statsDivTitle">Rebotes</p>
              <p className="statsDivInfo">
                {(
                  promedio.rebotesOfensivos + promedio.rebotesDefensivos
                ).toFixed(1)}{" "}
                {/* Suma y redondea a 1 decimal */}
              </p>
            </div>
            <div>
              <p className="statsDivTitle">Asistencias</p>
              <p className="statsDivInfo">
                {promedio.asistencias.toFixed(1)}
              </p>{" "}
              {/* Redondeado a 1 decimal */}
            </div>
          </div>
          <div className="statsColumn lowRow">
            <div>
              <p className="statsDivTitle">Robos</p>
              <p className="statsDivInfo">
                {promedio.recuperaciones.toFixed(1)}
              </p>{" "}
              {/* Redondeado a 1 decimal */}
            </div>
            <div>
              <p className="statsDivTitle">Pérdidas</p>
              <p className="statsDivInfo">
                {promedio.perdidas.toFixed(1)}
              </p>{" "}
              {/* Redondeado a 1 decimal */}
            </div>
            <div>
              <p className="statsDivTitle">Tapones</p>
              <p className="statsDivInfo">
                {promedio.taponesCometidos.toFixed(1)}
              </p>{" "}
              {/* Redondeado a 1 decimal */}
            </div>
            <div>
              <p className="statsDivTitle">Faltas</p>
              <p className="statsDivInfo">
                {promedio.faltasCometidas.toFixed(1)}
              </p>{" "}
              {/* Redondeado a 1 decimal */}
            </div>
            <div>
              <p className="statsDivTitle">Valoración</p>
              <p className="statsDivInfo">
                {promedio.valoracion.toFixed(1)}
              </p>{" "}
              {/* Redondeado a 1 decimal */}
            </div>
          </div>
        </div>
      </div>
      <div className="charts">
        {/* Gráfico de Promedio por Partido */}
        <div className="chart">
          <h2>Promedio por partido</h2>
          <Bar
            data={{
              labels: ["Puntos", "Rebotes", "Asistencias", "Robos", "Pérdidas"],
              datasets: [
                {
                  label: "Promedio por partido",
                  data: [
                    promedio.puntos,
                    promedio.rebotesOfensivos + promedio.rebotesDefensivos,
                    promedio.asistencias,
                    promedio.recuperaciones,
                    promedio.perdidas,
                  ],
                  backgroundColor: [
                    "#FF6384", // Puntos
                    "#36A2EB", // Rebotes
                    "#FFCE56", // Asistencias
                    "#4BC0C0", // Robos
                    "#9966FF", // Pérdidas
                  ],
                  borderColor: [
                    "#FF6384", // Puntos
                    "#36A2EB", // Rebotes
                    "#FFCE56", // Asistencias
                    "#4BC0C0", // Robos
                    "#9966FF", // Pérdidas
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Promedio por Partido",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Valor Promedio",
                  },
                },
              },
            }}
          />
        </div>

        {/* Gráfico de Distribución de los Tiros */}
        <div className="chart">
          <h2>Distribución de los Tiros Convertidos</h2>
          <Pie
            data={{
              labels: [
                /*"Tiros de Campo",*/
                "Tiros de 2",
                "Tiros de 3",
                "Tiros Libres",
              ],
              datasets: [
                {
                  label: "Tiros Convertidos",
                  data: [
                    /*promedio.tiros.tirosDeCampoConvertidos,*/
                    promedio.tiros.tirosDeDosConvertidos,
                    promedio.tiros.tirosDeTresConvertidos,
                    promedio.tiros.tirosLibresConvertidos,
                  ],
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Distribución de Tiros Convertidos",
                },
              },
            }}
          />
        </div>

        {/* Gráfico de Tendencia */}
        <div className="chart">
          <h2>Tendencia de rendimiento</h2>
          <Line
            data={{
              labels: ["Minutos", "Puntos", "Valoración"],
              datasets: [
                {
                  label: "Tendencia de estadísticas",
                  data: [
                    promedio.minutosJugados,
                    promedio.puntos,
                    promedio.valoracion,
                  ],
                  borderColor: "#FF6384", // Color de la línea
                  backgroundColor: "rgba(255, 99, 132, 0.2)", // Fondo de la línea
                  tension: 0.4, // Curvatura de la línea
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Tendencia de Rendimiento",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Valor de la Estadística",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;
