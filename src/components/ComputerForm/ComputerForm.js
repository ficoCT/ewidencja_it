import React, { useState } from 'react';
import FieldComputer from "../FieldComputer"
import validate from './validateComputerValues';

function mapComputerToFormValues(computer) {
  // console.log('mapComputerToFormValues', computer.id, ' ', computer.name, ' ', computer.company);
  return {
    name: computer.name,
    company: computer.company
  };
}

function mapFormValuesToComputer(values) {
  return {
    name:   values.name,
    company:  values.company
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
    <FieldComputer
        label="Nazwa"
        name="name"
        type="text"
        value={values.name}
        errorMessage={errorMessages?.name}
        onChange={handleChange}
    />
    <FieldComputer
        label="Producent"
        name="company"
        type="text"
        value={values.company}
        errorMessage={errorMessages?.name}
        onChange={handleChange}
    />
    <input type="submit" value={submitLabel} />
  </form>
  );
}