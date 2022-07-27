import * as React from 'react';

export default function ViewComputer({ computer: { id, company, model, inventoryNumber, serialNumber} }) {
  return (
      <>
        <strong> {id} </strong> {' '} {company} {' '} {model} {' '} {inventoryNumber} {' '} {serialNumber}
      </>
  );
}