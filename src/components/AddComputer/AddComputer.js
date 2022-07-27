import * as React from 'react';
import ComputerForm from "../ComputerForm";

export default function AddComputer({ onSubmit }) {

  const INITIAL_VALUES = { company: '', model: '', inventoryNumber: '', serialNumber: ''};

  return (
      <>
        <h3>Dodaj komputer</h3>
        <ComputerForm computer={INITIAL_VALUES} submitLabel="Dodaj" onSubmit={onSubmit} />
      </>
  );
}