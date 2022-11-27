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
                <Navbar bg="primary" variant="dark" className="mb-2">
                                <Nav className="me-auto navbarContainer">
                                    <Nav.Link href="/computers-manager-user">Komputer</Nav.Link>
                                    <Nav.Link href="/software">
                                        <CgSoftwareDownload className="navImg"/>
                                        Oprogramowanie
                                    </Nav.Link>
                                    <Nav.Link href="/otherHardware">
                                        <FaPrint className="navImg"/>
                                        Inne
                                    </Nav.Link>
                                    <Nav.Link href="/timetable">
                                        <FaCalendar className="navImg"/>
                                        Terminarz
                                    </Nav.Link>
                                    <Nav.Link href="/reports">
                                        <TbReportAnalytics className="navImg"/>
                                        Raporty
                                    </Nav.Link>
                                    <Nav.Link href="/repairs">
                                        <GiAutoRepair className="navImg"/>
                                        Naprawy
                                    </Nav.Link>
                                    <Nav.Link href="/administrator-log">
                                        <TfiNotepad className="navImg"/>
                                        Dziennik
                                    </Nav.Link>
                                    <Nav.Link href="/user-list">
                                        <FiUsers className="navImg"/>
                                        Użytkownicy
                                    </Nav.Link>
                                    <Nav.Link href="/computers-manager-admin">
                                        <FaLaptop className="navImg"/>
                                        Komputery
                                    </Nav.Link>
                                    <Nav.Link href="/logout">
                                        <MdLogout className="navImg"/>
                                        Wyloguj
                                    </Nav.Link>
                                </Nav>
                </Navbar>
                <Outlet />
            </>
    );
}