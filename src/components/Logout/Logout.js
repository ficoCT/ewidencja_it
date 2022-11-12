import * as React from 'react';
import {Link} from "react-router-dom";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {useState} from "react";
import Container from 'react-bootstrap/Container';

export default function Logout() {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const auth = getAuth();
    signOut(auth).then(() => {
        setIsSubmitted(true);
    }).catch((error) => {
        // An error happened.
    });

    const isLoggedOut = <>Wylogowanie nastąpiło <br /> pomyślnie!</>
    const isNotLoggedOut = <>Uuu coś poszło nie tak!</>

    return (
        <Container>
            <Link className="links" to="/login">Zaloguj</Link>
            {isSubmitted ? isLoggedOut : isNotLoggedOut }
        </Container>
    );
}