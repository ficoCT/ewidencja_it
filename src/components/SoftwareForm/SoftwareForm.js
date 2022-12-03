import React, { useState } from 'react';
import Field from "../Field"
import Button from "react-bootstrap/Button";

function mapSoftwareToFormValues(software) {
  return {
    company: software.company,
    type: software.type,
    name: software.name,
    key: software.key
  }
}

function mapFormValuesToSoftware(values) {
  return {
    company:values.company,
    type: values.type,
    name: values.name,
    key: values.key
  };
}

export default function SoftwareForm({softwareCompaniesData, softwareData, software, submitLabel, onSubmit}) {

  const initialValues = mapSoftwareToFormValues(software);
  const [values, setValues] = useState(initialValues);
  const handleChange = (name, value) => {

    setValues((values) => {
      return { ...values, [name]: value };
    });

  };

  function handleSubmit(event) {
    event.preventDefault();

    if (typeof onSubmit !== 'function') return;
    onSubmit(mapFormValuesToSoftware(values));
    setValues(initialValues);
  }

  return (
  <form onSubmit={handleSubmit}>
    <select
        id="company"
        name="company"
        class="form-select"
        onChange={(e) => {handleChange("company", e.target.value)}}
    >
      {softwareCompaniesData.length === 0 ?
          'Ładuje się ...'
          :
          softwareCompaniesData.map(({value, label}) => {
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
        id="name"
        name="name"
        class="form-select"
        onChange={(e) => handleChange("name", e.target.value)}
    >
      {Object.keys(softwareData).length === 0 ?
          'Ładuje się ...'
          :
          softwareData[values.company].map(value => {
            return (
                <option key={value} value={value} defaultValue={'Wybierz program'}>
                  {value}
                </option>
            );
          })}
    </select>
    <br />
    <br />
    <Field
        label="Klucz "
        name="key"
        type="text"
        value={values.key}
        onChange={(e) => handleChange("key", e.target.value)}
    />
    <Button variant="success" type="submit" >{submitLabel}</Button>
  </form>
  );
}