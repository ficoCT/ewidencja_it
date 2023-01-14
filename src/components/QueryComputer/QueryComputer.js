import * as React from 'react';
import Field from "../Field";
import {useState} from "react";

export default function QueryComputer({ submitLabel, onSubmit }) {

    const [values, setValues] = useState({company: "", model: "", materialIndex: "", serialNumber: ""});

    function handleChange(event) {

        const { name, value } = event.target;
        setValues(values => ({ ...values, [name]: value }))

    }

    function handleSubmit(event) {

        event.preventDefault();
        if (typeof onSubmit !== 'function') return;
        onSubmit(values);

    }

  return (
          <form onSubmit={handleSubmit}>

              <Field
                  label="Producent"
                  name="company"
                  type="text"
                  value={values.company}
                  onChange={handleChange}
              />
              <Field
                  label="Model"
                  name="model"
                  type="text"
                  value={values.model}
                  onChange={handleChange}
              />
              <Field
                  label="Numer inwentaryzacyjny"
                  name="materialIndex"
                  type="text"
                  value={values.materialIndex}
                  onChange={handleChange}
              />
              <Field
                  label="Numer seryjny"
                  name="serialNumber"
                  type="text"
                  value={values.serialNumber}
                  onChange={handleChange}
              />
              <button type="submit" className="btn btn-success mb-2">{submitLabel}</button>

          </form>
  );
}