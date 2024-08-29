import React from "react";
import NavBar from "../NavBar/NavBar";
import './inicio.css'
import { ReactComponent as Chabon } from '../../assets/chabon.svg'
const Inicio = () => {
    return (
        <div>
            <NavBar />        
            <div className="mainContainer">
                <div className="mainDesc">
                    <h1>MyStats</h1>
                    <p>
                        Con MyStats vas a poder llevar un control
                         de tus estadísticas de una manera fácil y rápida.
                         Vas a poder agregarlas manualmente y acceder a tus datos en cualquier momento.
                         Tendrás un resumen de tus estadísticas y podrás verlas en gráficos.
                    </p>
                    <a className="conocerBtn" href="#about">Conocer más</a>
                </div>
                <div className="chabonContainer">
                    <Chabon className="chabon"/>
                </div>
            </div>

            <div className="aboutContainer">
                <div id="about" className="aboutDesc">
                    <h1>Acerca de</h1>
                    <p>
                        MyStats es una aplicación web que te permite llevar un control de tus estadísticas personales.
                        Vas a poder agregar tus estadísticas manualmente y acceder a ellas en cualquier momento.
                        Vas a poder ver un resumen de tus estadísticas y verlas en gráficos.
                        En la sección de agregar vas a poder agregar tus estadísticas y en la sección de buscar vas a poder buscarlas.
                        En la sección de buscar vas a poder buscar tus estadísticas por fecha.
                        La aplicación fue pensada para ayudar a los jugadores amateur en su desarrollo 
                        como atletas y llegar a su máximo potencial.
                        La aplicación fue creada y diseñada por Joaquín Bardelli y Manuel Todorov.
                    </p>
                </div>
            </div>

            <div className="secciones">

                <div className="seccion">
                <img width="50" height="50" src="https://img.icons8.com/ios/50/920000/add-to-favorites--v1.png" alt="add-to-favorites--v1"/>
                <a href="/agregar">Agregar</a>
                <p>En esta sección deberás agregar tu información de cada partido.
                </p>
                </div>
                <div className="seccion">
                <img width="50" height="50" src="https://img.icons8.com/ios/50/920000/google-web-search.png" alt="google-web-search"/>
                <a href="/buscar">Buscar</a>
                <p>En esta sección podrás buscar tu información de cierto partido.</p>
                </div>
                <div className="seccion">
                <img width="50" height="50" src="https://img.icons8.com/ios/50/920000/statistics.png" alt="statistics"/>
                <a href="/stats">Stats</a>
                <p>En esta sección podrás buscar ver tus estadísticas generales.</p>
                </div>
            </div>

            <footer>
                <p>MyStats - 2024</p>
            </footer>
        </div>
    );
}

export default Inicio;