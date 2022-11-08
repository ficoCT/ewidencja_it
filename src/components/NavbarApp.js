import React from "react";
import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarApp() {
    return (
            <>
                <Navbar bg="primary" variant="dark">
                        <Container>
                                <Nav className="me-auto">
                                    <Nav.Link href="/computers-manager-user">Komputery użytkownik</Nav.Link>
                                    <Nav.Link href="/software">Oprogramowanie</Nav.Link>
                                    <Nav.Link href="/otherHardware">Inny sprzęt</Nav.Link>
                                    <Nav.Link href="/administration">Administracja</Nav.Link>
                                    <Nav.Link href="/timetable">Terminarz</Nav.Link>
                                    <Nav.Link href="/reports">Raporty</Nav.Link>
                                    <Nav.Link href="/repairs">Naprawy</Nav.Link>
                                    <Nav.Link href="/administrator-log">Dziennik administratora</Nav.Link>
                                    <Nav.Link href="/user-list">Użytkownicy</Nav.Link>
                                    {/*<Nav.Link href="/login">Zaloguj się</Nav.Link>*/}
                                    {/*<Nav.Link href="/register">Zarejestruj się</Nav.Link>*/}
                                    <Nav.Link href="/computers-manager-admin">Komputery administrator</Nav.Link>
                                </Nav>
                        </Container>
                </Navbar>
                <Outlet />
            </>
    );
}