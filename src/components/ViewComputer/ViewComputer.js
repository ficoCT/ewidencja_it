import * as React from 'react';

export default function ViewComputer({ computer: { id, company, model, materialIndex, serialNumber} }) {
  return (
      <>
        <strong> {id} </strong> {' '} {company} {' '} {model} {' '} {materialIndex} {' '} {serialNumber}
      </>
  );
}