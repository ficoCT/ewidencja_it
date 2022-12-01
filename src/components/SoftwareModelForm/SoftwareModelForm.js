import React, { useState } from 'react';
import Field from "../Field";

const types = [{value: 'office', label: ['Program biurowy']}, {value: 'system', label: ['System operacyjny']}]

export default function SoftwareModelForm({softwareCompaniesData, submitLabel, onSubmit }) {

  const initialValues = {company: softwareCompaniesData[0].value, type:  types[0].value, key: ''};

  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value) => {

    setValues((values) => {
      return { ...values, [name]: value };
    });

  };

  function handleSubmit(event) {
    event.preventDefault();
    if (typeof onSubmit !== 'function') return;
    onSubmit(values);
    setValues(initialValues);
  }

  return (
  <form onSubmit={handleSubmit}>

    <select
        id="company"
        name="company"
        value={values.company}
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
        value={values.type}
        onChange={(e) => {handleChange("type", e.target.value)}}
    >
      {types.length === 0 ?
          'Ładuje się ...'
          :
          types.map(({value, label}) => {
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