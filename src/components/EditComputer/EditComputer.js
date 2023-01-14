import * as React from 'react';
import ComputerForm from "../ComputerForm";

export default function EditComputer({ companiesData, modelsData, users, computer, onSubmit }) {

  return (
        <ComputerForm
            submitLabel="Zapisz"
            companiesData={companiesData}
            modelsData={modelsData}
            users={users}
            computer={computer}
            onSubmit={onSubmit}
        />
  );
}