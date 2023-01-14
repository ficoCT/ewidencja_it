import * as React from 'react';
import ComputerForm from "../ComputerForm";
import BarcodeScanner from "../BarcodeScanner";
import ToggleVisibility from "../ToggleVisibility";

export default function AddComputer({ companiesData, modelsData, users, computer, onSubmit }) {

  return (
      <div className="contents">

        <ComputerForm submitLabel="Dodaj"
                      companiesData={companiesData}
                      modelsData={modelsData}
                      users={users}
                      computer={computer}
                      onSubmit={onSubmit} />

        <h4 className="mt-2">Skanuj kod kreskowy</h4>
        <ToggleVisibility>
          <BarcodeScanner/>
        </ToggleVisibility>
      </div>
  );
}