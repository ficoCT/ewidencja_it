import * as React from 'react';
import Container from 'react-bootstrap/Container';

export default function Unauthorized() {
  return (
      <Container className="contents">

          <div style={{textAlign: "center", marginTop: "1rem"}}>
              <h1>Nie znaleziono takiej strony</h1>
          </div>

      </Container>
  );
}