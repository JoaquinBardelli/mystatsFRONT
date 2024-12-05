import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./borrar.css";

const Borrar = () => {
  const [emailLogin, setEmailLogin] = useState(""); // Estado para el correo del usuario
  const [partidoId, setPartidoId] = useState(""); // Estado para el ID del partido
  const handleSubmitLog = async (event) => {
    event.preventDefault(); // Prevenir que el formulario se recargue

    try {
      const token = localStorage.getItem("token");
      if (!token)
        throw new Error("No se proporcionó el token de autenticación");

      const response = await fetch(
        "http://localhost:3000/api/usuarios/borrar/id",
        {
          method: "POST", // Método de solicitud para borrar
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailLogin,
            id: partidoId,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Partido borrado con éxito");
      } else {
        alert(`Error: ${data.message || "No se pudo borrar el partido"}`);
      }
    } catch (error) {
      console.error("Error al borrar el partido:", error);
      alert("Hubo un error al intentar borrar el partido.");
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Borrar partido</h1>
      <form onSubmit={handleSubmitLog}>
        <label>Correo Usuario</label>
        <input
          type="email"
          placeholder="Correo"
          value={emailLogin}
          onChange={(e) => setEmailLogin(e.target.value)}
        />

        <label>ID del Partido</label>
        <input
          type="number"
          placeholder="ID partido"
          value={partidoId}
          onChange={(e) => setPartidoId(e.target.value)}
        />

        <button type="submit">Borrar Partido</button>
      </form>
    </div>
  );
};

export default Borrar;
