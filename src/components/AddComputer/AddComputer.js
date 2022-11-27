import * as React from 'react';
import ComputerForm from "../ComputerForm";

export default function AddComputer({companiesData, modelsData, computer,  onSubmit }) {

  return (
      <div className="contents">
        <h3>Dodaj komputer</h3>
        <ComputerForm submitLabel="Dodaj" companiesData={companiesData} modelsData={modelsData} computer={computer} onSubmit={onSubmit} />
      </div>
  );
}