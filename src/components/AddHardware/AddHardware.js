import * as React from 'react';
import HardwareForm from "../HardwareForm";

export default function AddHardware({ otherHardwareCompaniesData, otherHardwareData, otherHardware, onSubmit }) {

  return (
      <div className="contents">
        <HardwareForm
            submitLabel="Dodaj"
            otherHardwareCompaniesData={otherHardwareCompaniesData}
            otherHardwareData={otherHardwareData}
            otherHardware={otherHardware}
            onSubmit={onSubmit} />
      </div>
  );
}