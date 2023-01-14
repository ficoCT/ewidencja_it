import * as React from 'react';

export default function ViewComputer({ computer: { company, model, materialIndex, serialNumber, username } }) {
  return (
      <div style={{fontSize: "ComputerFormPrinting.3rem"}}>

        <strong> {serialNumber} </strong> {' '} {company} {' '} {model} {' '} {materialIndex} {' '}
          <strong> {username} </strong>

      </div>
  );
}