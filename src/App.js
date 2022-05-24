import './App.css';
import {Outlet, Link, Route} from "react-router-dom";

function App() {
  return (
      <>
      <nav>
      <Link to="/computers">Komputery</Link> |{" "}
      <Link to="/software">Oprogramowanie</Link> |{" "}
      <Link to="/otherHardware">Inny sprzęt</Link> |{" "}
      <Link to="/administration">Administracja</Link> |{" "}
      <Link to="/timetable">Terminarz</Link> |{" "}
      <Link to="/reports">Raporty</Link> |{" "}
      <Link to="/repairs">Naprawy</Link> |{" "}
      <Link to="/login">Zaloguj się</Link>
      </nav>
      <Outlet />
      </>
  );
}

export default App;
