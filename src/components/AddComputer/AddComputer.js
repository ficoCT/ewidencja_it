import * as React from 'react';
import ComputerForm from "../ComputerForm";

export default function AddComputer({ onSubmit }) {



  return (
      <>
        <h3>Dodaj komputer</h3>
        <ComputerForm submitLabel="Dodaj" onSubmit={onSubmit} />
      </>
  );
}