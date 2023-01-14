import React from "react";
import { Outlet } from "react-router-dom";
import { app } from "../../firebase"
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Button from "react-bootstrap/Button";
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
import { UserAuth } from "../../context/AuthContext";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { HiDesktopComputer } from "react-icons/hi";

export default function NavbarApp() {

    const { user } = UserAuth();
    const { logout } = UserAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setUser] = useState(false);

    if(typeof(user.uid)==="string") {

        const db = getFirestore(app);
        const userRef = doc(db, 'users', user.uid);
        const docSnap = getDoc(userRef).then(docSnap => {
            if (docSnap.exists()) {
                setIsAdmin(docSnap.data().roles.admin);
                if(!docSnap.data().roles.admin){
                    setUser(true);
                }
            }
        })

    }

    function handleLogoutButtonClick() {

        logout();

    }

    let navComponent;
    if (isUser) {
        navComponent =
            <Nav className="me-auto navbarContainer">
                <Nav.Link href="/home">
                    <AiOutlineHome className="navImg"/>
                    Home
                </Nav.Link>
                <Nav.Link href="/computer-user">
                    <FaLaptop className="navImg"/>
                    Komputer
                </Nav.Link>
                <Nav.Link href="/home">
                    <span className="importantText">{user.email}</span>
                </Nav.Link>
                <Nav.Link href="/login">
                    <Button size="sm" className="me-1" onClick={handleLogoutButtonClick}>
                        Wyloguj
                        <MdLogout className="navImg"/>
                    </Button>
                </Nav.Link>
            </Nav>;
    } else if (isAdmin){
        navComponent =
            <Nav className="me-auto navbarContainer">
                <Nav.Link href="/home">
                    <AiOutlineHome className="navImg"/>
                    Home
                </Nav.Link>
                <Nav.Link href="/computer-user">
                    <FaLaptop className="navImg"/>
                    Komputer
                </Nav.Link>
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
                    <HiDesktopComputer className="navImg"/>
                    Komputery
                </Nav.Link>
                <Nav.Link href="/login">
                    <Button size="sm" className="me-1" onClick={handleLogoutButtonClick}>
                        Wyloguj
                        <MdLogout className="navImg"/>
                    </Button>
                </Nav.Link>
            </Nav>;
    } else {
        navComponent =
            <Nav className="me-auto navbarContainer">
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav>;
    }

     return (
            <>

                <Navbar bg="primary" variant="dark" className="mb-2">
                    {navComponent}
                </Navbar>
                <Outlet />

            </>
    );
}