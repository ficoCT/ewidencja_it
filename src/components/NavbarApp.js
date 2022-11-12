import React from "react";
import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaPrint } from "react-icons/fa";
import { CgSoftwareDownload } from "react-icons/cg";
import { GiAutoRepair } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { FaCalendar } from "react-icons/fa";
import { TfiNotepad } from "react-icons/tfi";
import { FiUsers } from "react-icons/fi";
import { FaLaptop } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export default function NavbarApp() {
    return (
            <>
                <Navbar bg="primary" variant="dark">
                        <Container>
                                <Nav className="me-auto">
                                    <Nav.Link href="/computers-manager-user">Komputer</Nav.Link>
                                    <Nav.Link href="/software">
                                        <CgSoftwareDownload/>
                                        Oprogramowanie
                                    </Nav.Link>
                                    <Nav.Link href="/otherHardware">
                                        <FaPrint/>
                                        Inne
                                    </Nav.Link>
                                    <Nav.Link href="/timetable">
                                        <FaCalendar/>
                                        Terminarz
                                    </Nav.Link>
                                    <Nav.Link href="/reports">
                                        <TbReportAnalytics/>
                                        Raporty
                                    </Nav.Link>
                                    <Nav.Link href="/repairs">
                                        <GiAutoRepair/>
                                        Naprawy
                                    </Nav.Link>
                                    <Nav.Link href="/administrator-log">
                                        <TfiNotepad/>
                                        Dziennik
                                    </Nav.Link>
                                    <Nav.Link href="/user-list">
                                        <FiUsers/>
                                        Użytkownicy
                                    </Nav.Link>
                                    {/*<Nav.Link href="/login">Zaloguj się</Nav.Link>*/}
                                    {/*<Nav.Link href="/register">Zarejestruj się</Nav.Link>*/}
                                    <Nav.Link href="/computers-manager-admin">
                                        <FaLaptop/>
                                        Komputery
                                    </Nav.Link>
                                    <Nav.Link href="/logout">
                                        <MdLogout/>
                                        Wyloguj
                                    </Nav.Link>
                                </Nav>
                        </Container>
                </Navbar>
                <Outlet />
            </>
    );
}