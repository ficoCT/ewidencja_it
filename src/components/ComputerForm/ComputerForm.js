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

  const selectItems = {
    models: {
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

  const handleChangeS = (name, value) => {
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
    <select
        id="size1"
        name="size1"
        onChange={(e) => handleChangeS("company", e.target.value)}
    >
      {selectItems.models['company'].map(({ value, label }) => {
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
      {selectItems.models[values.company].map(({ value }) => {
        return (
            <option key={value} value={value}>
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