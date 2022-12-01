import React, { useState } from 'react';
import Field from "../Field"

function mapSoftwareToFormValues(software) {
  return {
    company: software.company,
    type: software.type,
    key: software.key
  }
}

function mapFormValuesToSoftware(values) {
  return {
    company:values.company,
    type: values.type,
    key: values.key
  };
}

export default function SoftwareForm({softwareCompaniesData, softwareData, software, submitLabel, onSubmit}) {
  console.log('softwareData', softwareData);
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
        id="type"
        name="type"
        onChange={(e) => handleChange("type", e.target.value)}
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
        label="Klucz produktu"
        name="key"
        type="text"
        value={values.key}
        onChange={(e) => handleChange("key", e.target.value)}
    />
    <input type="submit" value={submitLabel} />
  </form>
  );
}