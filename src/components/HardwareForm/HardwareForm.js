import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import LoadingData from "../LoadingData";
import Field from "../Field"

function mapHardwareToFormValues(otherHardware) {

  return {
    company: otherHardware.company,
    type: otherHardware.type,
    name: otherHardware.name,
    key: otherHardware.key
  }

}

function mapFormValuesToHardware(values) {

  return {
    company:values.company,
    type: values.type,
    name: values.name,
    key: values.key
  };

}

export default function HardwareForm({ otherHardwareCompaniesData, otherHardwareData, otherHardware, submitLabel,
                                       onSubmit }) {

  const initialValues = mapHardwareToFormValues(otherHardware);
  const [values, setValues] = useState(initialValues);
  const handleChange = (name, value) => {

    setValues((values) => {
      return { ...values, [name]: value };
    });

  };

  function handleSubmit(event) {

    event.preventDefault();
    if (typeof onSubmit !== 'function') return;
    onSubmit(mapFormValuesToHardware(values));
    setValues(initialValues);

  }

  return (
  <form onSubmit={handleSubmit}>

    <select
        id="company"
        name="company"
        className="form-select"
        onChange={(e) => {handleChange("company", e.target.value)}}
    >
      {otherHardwareCompaniesData.length === 0 ?
          <LoadingData/>
          :
          otherHardwareCompaniesData.map(({value, label}) => {
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
      {Object.keys(otherHardwareData).length === 0 ?
          <LoadingData/>
          :
          otherHardwareData[values.company].map(value => {
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
        label="Numer seryjny "
        name="key"
        type="text"
        value={values.key}
        onChange={(e) => handleChange("key", e.target.value)}
    />
    <Button variant="success" type="submit" >{submitLabel}</Button>

  </form>
  );
}