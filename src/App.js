import './App.css';
import {Outlet, Link, Route} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  return (
      <>
          <Navbar bg="light" variant="light">
              <Container>
                  <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                  <Nav className="me-auto">
                      <Link to="/computers-manager">
                          Komputery
                          <i className="fa-solid fa-computer"></i>
                      </Link> |{" "}
                      <Link to="/software">
                          Oprogramowanie
                          <i className="fa-solid fa-display-arrow-down"></i>
                      </Link> |{" "}
                      <Link to="/otherHardware">Inny sprzęt</Link> |{" "}
                      <Link to="/administration">Administracja</Link> |{" "}
                      <Link to="/timetable">Terminarz</Link> |{" "}
                      <Link to="/reports">Raporty</Link> |{" "}
                      <Link to="/repairs">Naprawy</Link> |{" "}
                      <Link to="/login">Zaloguj się</Link>
                  </Nav>
              </Container>
          </Navbar>
      <Outlet />
      </>
  );
}

export default App;
