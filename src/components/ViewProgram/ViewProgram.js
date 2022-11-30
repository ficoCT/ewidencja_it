import * as React from 'react';

export default function ViewProgram({ computer: { id, company, model, materialIndex, serialNumber, username} }) {
  return (
      <>
        <strong> {serialNumber} </strong> {' '} {company} {' '} {model} {' '} {materialIndex} {' '} <strong> {username} </strong>
      </>
  );
}