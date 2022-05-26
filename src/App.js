import './App.css';
import {Outlet, Link, Route} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComputer, faCompactDisc, faCalendarDays, faPrint, faNetworkWired, faFileCircleCheck, faScrewdriverWrench, faUserCheck, faArrowRightToBracket  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add( faComputer, faCompactDisc, faCalendarDays, faPrint, faNetworkWired, faFileCircleCheck, faScrewdriverWrench, faUserCheck, faArrowRightToBracket  );

function App() {
  return (
      <>
          <Navbar bg="light" variant="light">
              <Container>
                  <Nav className="me-auto">
                      <Link to="/computers-manager">
                          <FontAwesomeIcon icon="fa-computer" />
                          Komputery
                      </Link> |{" "}
                      <Link to="/software">
                          <FontAwesomeIcon icon="fa-compact-disc" />
                          Oprogramowanie
                      </Link> |{" "}
                      <Link to="/other-hardware">
                          <FontAwesomeIcon icon="fa-solid fa-print" />
                          Inny sprzęt
                      </Link> |{" "}
                      <Link to="/network-devices">
                          <FontAwesomeIcon icon="fa-solid fa-network-wired" />
                          Urządzenia sieciowe
                      </Link> |{" "}
                      <Link to="/timetable">
                          <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                          Terminarz
                      </Link> |{" "}
                      <Link to="/reports">
                          <FontAwesomeIcon icon="fa-solid fa-file-circle-check" />
                          Raporty
                      </Link> |{" "}
                      <Link to="/repairs">
                          <FontAwesomeIcon icon="fa-solid fa-screwdriver-wrench" />
                          Naprawy
                      </Link> |{" "}
                      <Link to="/administration">
                          <FontAwesomeIcon icon="fa-solid fa-user-check" />
                          Administracja
                      </Link> |{" "}
                      <Link to="/login">
                          <FontAwesomeIcon icon="fa-solid fa-arrow-right-to-bracket" />
                          Zaloguj się
                      </Link>
                  </Nav>
              </Container>
          </Navbar>
      <Outlet />
      </>
  );
}

export default App;
