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

export default function ComputerForm({ computer, submitLabel, onSubmit }) {

  const initialValues = mapComputerToFormValues(computer);
  const [values, setValues] = useState(initialValues);
  const [errorMessages, setErrorMessages] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues(values => ({ ...values, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errorMessages = validate(values);
    setErrorMessages(errorMessages);
    if (errorMessages) return;

    if (typeof onSubmit !== 'function') return;
    onSubmit(mapFormValuesToComputer(values));
    setValues(initialValues);
  }

  return (
  <form onSubmit={handleSubmit}>
    <Field
        label="Producent"
        name="company"
        type="text"
        value={values.company}
        errorMessage={errorMessages?.company}
        onChange={handleChange}
    />
    <Field
        label="Model"
        name="model"
        type="text"
        value={values.model}
        errorMessage={errorMessages?.model}
        onChange={handleChange}
    />
    <Field
        label="Numer inwentaryzacyjny"
        name="materialIndex"
        type="text"
        value={values.materialIndex}
        errorMessage={errorMessages?.materialIndex}
        onChange={handleChange}
    />
    <Field
        label="Numer seryjny"
        name="serialNumber"
        type="text"
        value={values.serialNumber}
        errorMessage={errorMessages?.serialNumber}
        onChange={handleChange}
    />
    <input type="submit" value={submitLabel} />
  </form>
  );
}