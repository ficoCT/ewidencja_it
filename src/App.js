import React from "react";
import { Outlet, Link } from "react-router-dom";

function App() {

  return (
      <div>
        <nav>
          <Link to="/computers-manager-user">Komputery użytkownik</Link> |{" "}
          <Link to="software">Oprogramowanie</Link> |{" "}
          <Link to="/otherHardware">Inny sprzęt</Link> |{" "}
          <Link to="/administration">Administracja</Link> |{" "}
          <Link to="/timetable">Terminarz</Link> |{" "}
          <Link to="/reports">Raporty</Link> |{" "}
          <Link to="/repairs">Naprawy</Link> |{" "}
          <Link to="/administrator-log">Dziennik administratora</Link> |{" "}
          <Link to="/user-list">Użytkownicy</Link> |{" "}
          <Link to="/login">Zaloguj się</Link> |{" "}
          <Link to="/register">Zarejestruj się</Link> |{" "}
          <Link to="/computers-manager-admin">Komputery administrator</Link> |{" "}
        </nav>
        <Outlet />
      </div>
  );
}

export default App;
