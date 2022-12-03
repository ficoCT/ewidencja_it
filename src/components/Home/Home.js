import * as React from 'react';
import Container from 'react-bootstrap/Container';
import {UserAuth} from "../../context/AuthContext";

export default function Home() {

  const { user } = UserAuth();

  return (
      <Container className="contents">
        <h1>SYSTEM GOSPODARKI SPRZĘTEM TELEINFORMATYCZNYM</h1>
        <br />
        <h2>Witaj {user.email} </h2>
      </Container>
  );
}