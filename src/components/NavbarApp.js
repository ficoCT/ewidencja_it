import React from "react";
import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarApp() {
    return (
        // <div>
        //     <nav>
        //     <Link to="/computers-manager-user">Komputery użytkownik</Link> |{" "}
        //     <Link to="software">Oprogramowanie</Link> |{" "}
        //     <Link to="/otherHardware">Inny sprzęt</Link> |{" "}
        //     <Link to="/administration">Administracja</Link> |{" "}
        //     <Link to="/timetable">Terminarz</Link> |{" "}
        //     <Link to="/reports">Raporty</Link> |{" "}
        //     <Link to="/repairs">Naprawy</Link> |{" "}
        //     <Link to="/administrator-log">Dziennik administratora</Link> |{" "}
        //     <Link to="/user-list">Użytkownicy</Link> |{" "}
        //     <Link to="/login">Zaloguj się</Link> |{" "}
        //     <Link to="/register">Zarejestruj się</Link> |{" "}
        //     <Link to="/computers-manager-admin">Komputery administrator</Link> |{" "}
        //     </nav>
        //     <Outlet />
        // </div>
        <>
                <Navbar bg="primary" variant="dark">
                        <Container>
                                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                                <Nav className="me-auto">
                                        <Nav.Link href="#home">Home</Nav.Link>
                                        <Nav.Link href="#features">Features</Nav.Link>
                                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                                </Nav>
                        </Container>
                </Navbar>
                <Outlet />
        </>
    );
}