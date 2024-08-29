import React from "react";
import NavBar from '../NavBar/NavBar'
import './stats.css'

const Stats = () => {   
    return (
        <div>
            <NavBar />
            <div className="statsContainer">
            <div className="playerContainer">


            <div className="playerText">
                
                <div className="present">
                <h1>Joaquin Bardelli</h1>
                <form action="/upload" method="post" enctype="multipart/form-data">
    <label for="imagen">Elige una imagen:</label>
    <input type="file" id="imagen" name="imagen" accept="image/*"></input>
    <button type="submit">Subir Imagen</button>
</form>

                </div>
                    <div className="moreDetailCont">
                        <div className="ultraDetail">
                        <p>HT/HW: </p>
                        <p>Nacimiento: </p>
                        <p>Club: </p>
                        <p>Dorsal: </p>
                        </div>
                        <div className="ultraDetail">
                        <p><b>184cm/83kg</b></p>
                        <p><b>29/3/2006</b></p>
                        <p><b>Arquitectura</b></p>    
                        <p><b>44</b></p>
                        </div>
                    </div>
            </div>
            </div>


            <div className="stats">
                <div className="statsColumn topRow">
                    <div>
                        <p className="statsDivTitle">Partidos</p>
                        <p className="statsDivInfo">48</p>
                    </div>
                    <div>
                        <p className="statsDivTitle">Minutos</p>
                        <p className="statsDivInfo">344</p>
                    </div>
                    <div>
                        <p className="statsDivTitle">Puntos</p>
                        <p className="statsDivInfo">106</p>
                    </div>
                    <div>
                        <p className="statsDivTitle">Rebotes</p>
                        <p className="statsDivInfo">147</p>
                    </div>
                    <div>
                        <p className="statsDivTitle">Asistencias</p>
                        <p className="statsDivInfo">26</p>
                    </div>
                    
                </div>
                <div className="statsColumn lowRow">
                <div>
                        <p className="statsDivTitle">Robos</p>
                        <p className="statsDivInfo">7</p>
                    </div>
                    <div>
                        <p className="statsDivTitle">Pérdidas</p>
                        <p className="statsDivInfo">45</p>
                    </div>
                    <div>
                        <p className="statsDivTitle">Tapones</p>
                        <p className="statsDivInfo">2</p>
                    </div>
                    <div>
                        <p className="statsDivTitle">Faltas</p>
                        <p className="statsDivInfo">56</p>
                    </div>
                    <div>
                        <p className="statsDivTitle">Valoración</p>
                        <p className="statsDivInfo">89</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Stats;