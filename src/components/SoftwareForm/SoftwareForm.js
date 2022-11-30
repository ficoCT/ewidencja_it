import React, { useState } from 'react';
import Field from "../Field"

function mapSoftwareToFormValues(software) {
  return {
    company: software.company,
    name: software.name,
    type: software.key
  }
}

function mapFormValuesToSoftware(values) {
  return {
    company:values.company,
    name: values.name,
    key: values.key
  };
}

export default function SoftwareForm({companiesData, softwareData, users, software, submitLabel, onSubmit}) {

  const initialValues = mapSoftwareToFormValues(software);

  const [values, setValues] = useState(initialValues);
  const [errorMessages, setErrorMessages] = useState(null);

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
      {companiesData.length === 0 ?
          'Ładuje się ...'
          :
          companiesData.map(({value, label}) => {
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
        label="Klucz produktu"
        name="key"
        type="text"
        value={values.key}
        onChange={(e) => handleChange("key", e.target.value)}
    />
    <select
        id="users"
        name="users"
        onChange={(e) => handleChange("idUser", e.target.value)}
    >
      {users.length === 0 ?
          'Ładuje się ...'
          :
          users.map(({id, username}) => {
            return (
                <option key={id} value={id}>
                  {username}
                </option>
            );
          })
      }
    </select>
    <input type="submit" value={submitLabel} />
  </form>
  );
}