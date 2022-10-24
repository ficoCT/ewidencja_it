import * as React from 'react';
import ComputerForm from "../ComputerForm";

export default function EditComputer({companiesData, modelsData, computer, onSubmit }) {

  return (
        <ComputerForm submitLabel="Zapisz" companiesData={companiesData} modelsData={modelsData} computer={computer} onSubmit={onSubmit}/>
  );
}