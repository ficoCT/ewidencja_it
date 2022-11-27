import * as React from 'react';

export default function ViewComputer({ computer: { id, company, model, materialIndex, serialNumber, username} }) {
  return (
      <>
        <strong> {serialNumber} </strong> {' '} {company} {' '} {model} {' '} {materialIndex} {' '} <strong> {username} </strong>
      </>
  );
}