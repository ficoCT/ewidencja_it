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
  // const [values, setValues] = useState(initialValues);
  const [values, setValues] = useState({
    company: 'dell',
    materialIndex: '',
    model: 'modelDell1',
    serialNumber: ''});
  const [errorMessages, setErrorMessages] = useState(null);

  const selectItems = {
    name: "size",
    fields: {
      company: [
        {
          value: "dell",
          label: "Dell",
        },
        {
          value: "asus",
          label: "Asus",
        },
        {
          value: "toshiba",
          label: "Toshiba",
        }
      ],
      dell: [
        {
          value: "modelDell1",
        },
        {
          value: "modelDell2"
        },
        {
          value: "modelDell3"
        }
      ],
      asus: [
        {
          value: "modelAsus1",
        },
        {
          value: "modelAsus2"
        },
        {
          value: "modelAsus3"
        }
      ],
      toshiba: [
        {
          value: "modelToshiba1",
        },
        {
          value: "modelToshiba2"
        },
        {
          value: "modelToshiba3"
        }
      ],
    }
  };

  const [valuesS, setValuesS] = useState({company: 'dell'});

  const handleChangeS = (name, value) => {
    console.log('[name]: value', name, value);
    setValues((s) => {
      return { ...s, [name]: value };
    });
  };

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
    {/*<Field*/}
    {/*    label="Producent"*/}
    {/*    name="company"*/}
    {/*    type="text"*/}
    {/*    value={values.company}*/}
    {/*    errorMessage={errorMessages?.company}*/}
    {/*    onChange={handleChange}*/}
    {/*/>*/}
    {/*<Field*/}
    {/*    label="Model"*/}
    {/*    name="model"*/}
    {/*    type="text"*/}
    {/*    value={values.model}*/}
    {/*    errorMessage={errorMessages?.model}*/}
    {/*    onChange={handleChange}*/}
    {/*/>*/}
    <select
        id="size1"
        name="size1"
        onChange={(e) => handleChangeS("company", e.target.value)}
    >
      {selectItems.fields['company'].map(({ value, label }) => {
        return (
            <option key={value} value={value}>
              {label}
            </option>
        );
      })}
    </select>
    <br />
    <br />
    <select
        id="size2"
        name="size2"
        onChange={(e) => handleChangeS("model", e.target.value)}
    >
      {selectItems.fields[values.company].map(({ value, selected }) => {
        return (
            <option key={value} value={value} selected={!!selected}>
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