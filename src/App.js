
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Inicio from './components/Inicio/Inicio.js';
import Agregar from './components/Agregar/Agregar.js';
import Buscar from './components/Buscar/Buscar.js';
import Stats from './components/Stats/Stats.js';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/agregar' element={<Agregar />} />
        <Route path='/buscar' element={<Buscar />} />
        <Route path='stats' element={<Stats />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
