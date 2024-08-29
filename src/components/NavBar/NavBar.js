import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Hamburger } from '../../assets/hamburguerIcon.svg'
import './navbar.css'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [isPopupOpenRegistro, setPopUpOpenRegistro] = useState(false);
  const [isPopupOpenLogin, setPopUpOpenLogin] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const openPopUpRegistro = () => {
    setPopUpOpenRegistro(true);
  };

  const closePopUpRegistro = () => {
    setPopUpOpenRegistro(false);
  };

  const openPopUpLogin = () => {
    setPopUpOpenLogin(true);
  };

  const closePopUpLogin = () => {
    setPopUpOpenLogin(false);
  };

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [club, setClub] = useState('');
  const [dorsal, setDorsal] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      usuarios: {
        id: 1,  // Este es opcional si el backend lo genera automáticamente
        email: email,
        password: password,
        created: new Date().toISOString(),
        jugador: {
          id: 1,  // Este también es opcional si el backend lo genera automáticamente
          nombre: nombre,
          apellido: apellido,
          nacimiento: new Date(nacimiento).toISOString(),
          club: club,
          dorsal: parseInt(dorsal),
          altura: parseInt(altura),
          peso: parseInt(peso),
          partidos: {
            id: 1,
            fecha: "",
            adversario: "",
            puntosPropioClub: 0,
            puntosAdversario: 0,
            estadisticas:{
              minutosJugados: 0,
              segundosJugados: 0,
              puntos: 0,
              rebotesOfensivos: 0,
              rebotesDefensivos: 0,
              asistencias: 0,
              faltasCometidas: 0,
              faltasRecibidas: 0,
              taponesRecibidos: 0,
              taponesRealizados: 0,
              perdidas: 0,
              recuperaciones: 0,
              valoracion: 0,
              tiros:{
                tirosDeCampo:0,
                tirosDeCampoConvertidos:0,
                tirosDeDos:0,
                tirosDeDosConvertidos:0,
                tirosDeTres:0,
                tirosDeTresConvertidos:0,
                tirosLibres:0,
                tirosLibresConvertidos:0
              }
            }
          }
        }
      }
    };
    

    fetch('http://localhost:3000/api/usuarios/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
      .then(data => {
        console.log('Response from backend:', data); // Verifica la respuesta del backend
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('Token guardado:', data.token);
        } else {
          console.error('Error en el registro, token no recibido');
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);  // Verifica el error de la solicitud
      });
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      usuarios: {  // Cambiado de 'usuarios' a 'usuario' para reflejar el cambio en el backend
        email: email,
        password: password,
        jugador: {
          nombre: nombre,
          apellido: apellido,
          nacimiento: new Date(nacimiento).toISOString(),
          club: club,
          dorsal: parseInt(dorsal),
          altura: parseInt(altura),
          peso: parseInt(peso),
          partidos: []
        }
      }
    };

    console.log('Data to send:', data);  // Verifica los datos a enviar

    fetch('http://localhost:3000/api/usuarios/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from backend:', data); // Verifica la respuesta del backend
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('Token guardado:', data.token);
        } else {
          console.error('Error en el registro, token no recibido');
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);  // Verifica el error de la solicitud
      });

  };*/


  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const handleSubmitLog = async (event) => {
    event.preventDefault();
  
    const data = {
      usuarios: {
        email: emailLogin,
        password: passwordLogin
      }
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
      console.log('Response from backend:', result); // Verifica la respuesta del backend
  
      if (result.token) {
        localStorage.setItem('token', result.token.token);
        console.log('Token guardado:', result.token.token);
      } else {
        console.error('Error en el login, token no recibido');
      }
  
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };


  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          MY STATS
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/agregar">Agregar</NavLink>
            </li>
            <li>
              <NavLink to="/buscar">Buscar</NavLink>
            </li>
            <li>
              <NavLink to="/stats">Stats</NavLink>
            </li>

            <li>
              <button onClick={openPopUpLogin} id='iniciarBtn'>Iniciar sesión</button>
              {isPopupOpenLogin && (
                <div className="ventana-popup">
                  <div className="contenido-popup">
                    <h2>Inicia Sesión</h2>
                    <form onSubmit={handleSubmitLog}>
                      <label>Correo</label>
                      <input
                        type="email"
                        placeholder="Correo"
                        value={emailLogin}
                        onChange={(e) => setEmailLogin(e.target.value)} // Actualizar el estado al cambiar el valor
                      />
                      <label>Contraseña</label>
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={passwordLogin}
                        onChange={(e) => setPasswordLogin(e.target.value)} // Actualizar el estado al cambiar el valor
                      />
                      <button className='finishBtn' type="submit">Login</button>
                    </form>
                    <button className='cerrarBtn' onClick={closePopUpLogin}><img width="50" height="50" src="https://img.icons8.com/ios/50/FA5252/close-window--v1.png" alt="close-window--v1" /></button>
                  </div>
                </div>
              )}
            </li>
            <li>
              <button onClick={openPopUpRegistro} id='registrarBtn'>Registrarme</button>
              {isPopupOpenRegistro && (
                <div className="ventana-popup">
                  <div className="contenido-popup">
                    <h2>Registrate</h2>
                    <form onSubmit={handleSubmit}>
                      <div className='registerDiv'>
                        <label>Información personal</label>
                        <div id='infoPlayer'>
                          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                          <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                          <input type="date" placeholder="Fecha de nacimiento" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} />
                          <input type="number" placeholder="Altura" value={altura} onChange={(e) => setAltura(e.target.value)} />
                          <input type="number" placeholder="Peso" value={peso} onChange={(e) => setPeso(e.target.value)} />
                        </div>
                      </div>
                      <div className='registerDiv'>
                        <label>Información de jugador</label>
                        <div>
                          <input type="text" placeholder="Club" value={club} onChange={(e) => setClub(e.target.value)} />
                          <input type="number" placeholder="Dorsal" value={dorsal} onChange={(e) => setDorsal(e.target.value)} />
                        </div>
                      </div>
                      <div className='registerDiv'>
                        <label>Información de cuenta</label>
                        <div>
                          <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                      </div>
                      <button className='finishBtn' type="submit">Registrarme</button>
                    </form>
                    <button className='cerrarBtn' onClick={closePopUpRegistro}><img width="50" height="50" src="https://img.icons8.com/ios/50/FA5252/close-window--v1.png" alt="close-window--v1" /></button>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
