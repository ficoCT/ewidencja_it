import React, { useState } from 'react';
import Field from "../Field";
import Button from "react-bootstrap/Button";
import LoadingData from "../LoadingData";

const types = [{value: 'printer', label: ['Drukarka']}, {value: 'scanner', label: ['Skaner']}]

export default function HardwareModelForm({companiesData, submitLabel, onSubmit }) {

  const initialValues = {company: companiesData[0].value, types:  types[0].value, model: 'Podaj model'};
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
            className="form-select"
            onChange={(e) => {handleChange("company", e.target.value)}}
        >
          {companiesData.length === 0 ?
              <LoadingData/>
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
            id="types"
            name="types"
            value={values.types}
            className="form-select"
            onChange={(e) => {handleChange("types", e.target.value)}}
        >
          {types.length === 0 ?
              <LoadingData/>
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
            label="Model"
            name="model"
            type="text"
            value={values.model}
            onChange={(e) => handleChange("model", e.target.value)}
        />
        <Button variant="success" type="submit" >{submitLabel}</Button>
      </form>
  );
}


