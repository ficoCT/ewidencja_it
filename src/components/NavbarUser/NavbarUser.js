import React from "react";
import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarUser({username}) {

    console.log('username', username);

    return (
            <>

                <Navbar bg="primary" variant="dark">
                        <Container>
                                <Nav className="me-auto">
                                    <Nav.Link href="/computers-manager-user">Moje komputery</Nav.Link>
                                    <Nav.Link href="/home">Info</Nav.Link>
                                </Nav>
                        </Container>
                </Navbar>
                <Outlet />

            </>
    );
}