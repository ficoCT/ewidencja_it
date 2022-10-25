import {Link} from "react-router-dom";

export default function NavbarAdmin() {
    return (
        <div>
            <nav>
            <Link to="/computers-manager-user">Komputery użytkownik</Link> |{" "}
            <Link to="/software">Oprogramowanie</Link> |{" "}
            <Link to="/otherHardware">Inny sprzęt</Link> |{" "}
            <Link to="/administration">Administracja</Link> |{" "}
            <Link to="/timetable">Terminarz</Link> |{" "}
            <Link to="/reports">Raporty</Link> |{" "}
            <Link to="/repairs">Naprawy</Link> |{" "}
            <Link to="/administrator-log">Dziennik administratora</Link> |{" "}
            <Link to="/login">Zaloguj się</Link> |{" "}
            <Link to="/register">Zarejestruj się</Link> |{" "}
            <Link to="/computers-manager-admin">Komputery administrator</Link> |{" "}
            </nav>
        </div>
    );
}