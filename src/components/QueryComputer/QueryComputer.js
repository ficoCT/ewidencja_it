import * as React from 'react';
import Field from "../Field";
import {useState} from "react";

export default function QueryComputer({submitLabel, onSubmit }) {

    const [values, setValues] = useState({company: ""});

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
                  label="Wyszukaj"
                  name="company"
                  type="text"
                  value={values.company}
                  onChange={handleChange}
              />
              <input type="submit" value={submitLabel} />
          </form>
  );
}