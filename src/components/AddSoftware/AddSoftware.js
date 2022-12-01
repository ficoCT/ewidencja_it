import * as React from 'react';
import SoftwareForm from "../SoftwareForm";

export default function AddSoftware({softwareCompaniesData, softwareData, software, onSubmit}) {

  return (
      <div className="contents">
        <h3>Dodaj program</h3>
        <SoftwareForm submitLabel="Dodaj" softwareCompaniesData={softwareCompaniesData} softwareData={softwareData} software={software} onSubmit={onSubmit} />
      </div>
  );
}