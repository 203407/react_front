import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import GeneralData from "./Componentes/GeneralData"
import Tablas from "./Componentes/Tablas"
import Inicio from "./Componentes/Inicio"
import TablaSensores from "./Componentes/TablaSensores";

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './index.css'

import {Link} from "react-router-dom";


function App() {
  return (
 
   
  <Router>
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nvs">
      <Container>
        <Link to={"/"} className={"log_out_link"}>home</Link>        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Link to={"/GeneralData"} className={"log_out_link"}>Datos generales</Link> 
          <Link to={"/Tablas"} className={"log_out_link"}>Estadisticas</Link> 
          <Link to={"/TablaSensores"} className={"log_out_link"}>Tabla sensores</Link> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


<Routes>
  <Route  exact path="/" element={<Inicio/>} ></Route>
  <Route  exact path="/GeneralData" element={<GeneralData/>} ></Route>
  <Route  exact path="/Tablas" element={<Tablas/>} ></Route>
  <Route  exact path="/TablaSensores" element={<TablaSensores/>} ></Route>
</Routes>

</Router>

  );
}

export default App;
