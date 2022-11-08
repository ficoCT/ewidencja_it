import * as React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

export default function Software() {
  return (
      <Container>
          <Button as="a" variant="success">
            Button as link
          </Button>
      </Container>
  );
}