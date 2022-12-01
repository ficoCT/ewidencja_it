import * as React from 'react';

export default function ViewComputer({ computer: { id, company, model, materialIndex, serialNumber, username} }) {
  return (
      <div style={{fontSize: "1.3rem"}}>
        <strong> {serialNumber} </strong> {' '} {company} {' '} {model} {' '} {materialIndex} {' '} <strong> {username} </strong>
      </div>
  );
}