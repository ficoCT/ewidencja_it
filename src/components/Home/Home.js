import * as React from 'react';
import Container from 'react-bootstrap/Container';
import {UserAuth} from "../../context/AuthContext";

export default function Home() {

  const { user } = UserAuth();

  return (
      <Container className="contents">
                <div style={{textAlign: "center", marginTop: "1rem"}}>
                <h2>SYSTEM GOSPODARKI SPRZĘTEM TELEINFORMATYCZNYM</h2>
                <br />
                <h2> Witaj <span className="importantText">{user.email}</span> </h2>
          </div>
      </Container>
  );
}