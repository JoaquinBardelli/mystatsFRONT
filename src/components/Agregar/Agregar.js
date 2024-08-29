import React, { useState } from 'react';
import NavBar from "../NavBar/NavBar";
import './agregar.css';                                                                                                                  
const Agregar = () => {

    const [formData, setFormData] = useState({
        equipoRival: '',
        fecha: '',
        puntosFavor: '',
        puntosContra: '',
        minutosJugados: '',
        segundosJugados: '',
        puntosConvertidos: '',
        rebotesOfensivos: '',
        rebotesDefensivos: '',
        asistencias: '',
        faltasCometidas: '',
        faltasRecibidas: '',
        taponesCometidos: '',
        taponesRecibidos: '',
        balonesPerdidos: '',
        recuperaciones: '',
        valoracion: '',
        tirosDeCampo: '',
        tirosDeCampoConvertidos: '',
        tirosDeDos: '',
        tirosDeDosConvertidos: '',
        tirosDeTres: '',
        tirosDeTresConvertidos: '',
        tirosLibres: '',
        tirosLibresConvertidos: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const partidoData = {
            id: 1, // Esto podrías generarlo dinámicamente
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
                taponesRealizados: formData.taponesCometidos,
                perdidas: formData.balonesPerdidos,
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
                    tirosLibresConvertidos: formData.tirosLibresConvertidos
                }
            }
        };
    
        const token = localStorage.getItem('token'); // O usa sessionStorage o un estado
        console.log( JSON.stringify(partidoData));
        try {
            const response = await fetch('http://localhost:3000/api/usuarios/agregarPartido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluir el token aquí
                },
                body: JSON.stringify(partidoData),
            });
            console.log('response', response);
            if (response.ok) {
                const data = await response.json();
                console.log('Partido agregado con éxito:', data);
            } else {
                const errorData = await response.json();
                console.error('Error al agregar el partido:', errorData);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    

    return (
        <div>
            <NavBar />
            <div className="agregarContainer">
            <form onSubmit={handleSubmit}>
            <div className="formStatsContainer">
                <label>Datos partido</label>
                <div>
                    <input type="text" name="equipoRival" placeholder="Equipo rival" onChange={handleChange}></input>
                    <input type="date" name="fecha" placeholder="Fecha" onChange={handleChange}/>
                    <input type="number" name="puntosFavor" placeholder="Puntos a favor" onChange={handleChange}/>
                    <input type="number" name="puntosContra" placeholder="Puntos en contra" onChange={handleChange}/>
                </div>
            </div>

            <div className="formStatsContainer">
                <label>Estadísticas jugador</label>
                <div className="formInputContainer">
                    <input type="number" name="minutosJugados" placeholder="Minutos jugados" onChange={handleChange}></input>
                    <input type="number" name="segundosJugados" placeholder="Segundos jugados" onChange={handleChange}></input>
                    <input type="number" name="puntosConvertidos" placeholder="Puntos convertidos" onChange={handleChange}></input>
                    <input type="number" name="rebotesOfensivos" placeholder="Rebotes ofensivos" onChange={handleChange}></input>
                    <input type="number" name="rebotesDefensivos" placeholder="Rebotes defensivos" onChange={handleChange}></input>
                    <input type="number" name="asistencias" placeholder="Asistencias" onChange={handleChange}></input>
                    <input type="number" name="faltasCometidas" placeholder="Faltas cometidas" onChange={handleChange}></input>
                    <input type="number" name="faltasRecibidas" placeholder="Faltas recibidas" onChange={handleChange}></input>
                    <input type="number" name="taponesCometidos" placeholder="Tapones cometidos" onChange={handleChange}></input>
                    <input type="number" name="taponesRecibidos" placeholder="Tapones recibidos" onChange={handleChange}></input>
                    <input type="number" name="balonesPerdidos" placeholder="Balones perdidos" onChange={handleChange}></input>
                    <input type="number" name="recuperaciones" placeholder="Recuperaciones" onChange={handleChange}></input>
                    <input type="number" name="valoracion" placeholder="Valoracion" onChange={handleChange}></input>
                </div>
            </div>

            <div className="formStatsContainer">
                <label>Estadísticas tiros</label>
                <div className="formInputContainer">
                    <input type="number" name="tirosDeCampo" placeholder="Tiros de campo" onChange={handleChange}></input>
                    <input type="number" name="tirosDeCampoConvertidos" placeholder="Tiros de campo convertidos" onChange={handleChange}></input>
                    <input type="number" name="tirosDeDos" placeholder="Tiros de dos" onChange={handleChange}></input>
                    <input type="number" name="tirosDeDosConvertidos" placeholder="Tiros de dos convertidos" onChange={handleChange}></input>
                    <input type="number" name="tirosDeTres" placeholder="Tiros de tres" onChange={handleChange}></input>
                    <input type="number" name="tirosDeTresConvertidos" placeholder="Tiros de tres convertidos" onChange={handleChange}></input>
                    <input type="number" name="tirosLibres" placeholder="Tiros libres" onChange={handleChange}></input>
                    <input type="number" name="tirosLibresConvertidos" placeholder="Tiros libres convertidos" onChange={handleChange}></input>
                </div>
            </div>

            <button className="formAgregarBtn" type="submit">Agregar partido</button>
        </form>
            </div>

        </div>
    );
}

export default Agregar;