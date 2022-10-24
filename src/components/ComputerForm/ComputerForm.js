import React, { useState } from 'react';
import Field from "../Field"
import validate from './validateComputerValues';

function mapComputerToFormValues(computer) {
  return {
    company: computer.company,
    materialIndex: computer.materialIndex,
    model: computer.model,
    serialNumber: computer.serialNumber
  };
}

function mapFormValuesToComputer(values) {
  return {
    company:values.company,
    materialIndex: values.materialIndex,
    model: values.model,
    serialNumber: values.serialNumber
  };
}

export default function ComputerForm({companiesData, modelsData, computer, submitLabel, onSubmit }) {

  const initialValues = mapComputerToFormValues(computer);

  const [values, setValues] = useState(initialValues);
  const [companies, setCompanies] = useState(companiesData);
  const [models, setModels] = useState(modelsData);

  const [errorMessages, setErrorMessages] = useState(null);

  const handleChange = (name, value) => {

    setValues((values) => {
      return { ...values, [name]: value };
    });

  };

  function handleSubmit(event) {
    event.preventDefault();
    const errorMessages = validate(values);
    setErrorMessages(errorMessages);
    if (errorMessages) return;

    if (typeof onSubmit !== 'function') return;
    onSubmit(mapFormValuesToComputer(values));
  }

  return (
  <form onSubmit={handleSubmit}>

    <select
        id="company"
        name="company"
        onChange={(e) => {handleChange("company", e.target.value)}}
    >
      {companies.length === 0 ?
          'Ładuje się ...'
          :
          companies.map(({value, label}) => {
            return (
                <option key={value} value={value}>
                  {label}
                </option>
            );
          })
      }
    </select>
    <br />
    <br />
    <select
        id="models"
        name="models"
        onChange={(e) => handleChange("model", e.target.value)}
    >
      {Object.keys(models).length === 0 ?
          'Ładuje się ...'
          :
          models[values.company].map(value => {
            return (
                <option key={value} value={value} defaultValue={'Wybierz model'}>
                  {value}
                </option>
            );
          })}
    </select>
    <br />
    <br />
    <Field
        label="Numer inwentaryzacyjny"
        name="materialIndex"
        type="text"
        value={values.materialIndex}
        errorMessage={errorMessages?.materialIndex}
        onChange={(e) => handleChange("materialIndex", e.target.value)}
    />
    <Field
        label="Numer seryjny"
        name="serialNumber"
        type="text"
        value={values.serialNumber}
        errorMessage={errorMessages?.serialNumber}
        onChange={(e) => handleChange("serialNumber", e.target.value)}
    />
    <input type="submit" value={submitLabel} />
  </form>
  );
}