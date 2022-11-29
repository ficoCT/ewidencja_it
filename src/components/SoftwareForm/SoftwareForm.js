import React, { useState } from 'react';
import Field from "../Field";

const types = [{value: 'office', label: ['Program biurowy']}, {value: 'system', label: ['System operacyjny']}]

export default function SoftwareForm({softwareCompaniesData, submitLabel, onSubmit }) {

  const initialValues = {company: softwareCompaniesData[0].value, types:  types[0].value, program: ''};

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
        id="types"
        name="types"
        value={values.types}
        onChange={(e) => {handleChange("types", e.target.value)}}
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
        label="Program"
        name="program"
        type="text"
        value={values.program}
        onChange={(e) => handleChange("program", e.target.value)}
    />
    <input type="submit" value={submitLabel} />
  </form>
  );
}