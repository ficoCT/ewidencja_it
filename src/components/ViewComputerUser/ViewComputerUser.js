import * as React from 'react';
import Alert from "react-bootstrap/Alert";

export default function ViewComputerUser({ computer: { id, company, model, materialIndex, serialNumber, username} }) {
  return (
      <Alert variant="primary"style={{fontSize: "1.3rem"}} >
        <strong> {serialNumber} </strong> {' '} {company} {' '} {model} {' '} {materialIndex} {' '} <strong> {username} </strong>
      </Alert>
  );
}