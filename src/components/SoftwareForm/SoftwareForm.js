import React, { useState } from 'react';
import Field from "../Field";

// const types = [{value: 'desktops', label: ['Desktops']}, {value: 'laptops', label: ['Laptops']}]

export default function SoftwareForm({softwareCompaniesData, submitLabel, onSubmit }) {

  // const initialValues = {company: companiesData[0].value, types:  types[0].value, model: ''};
  //
  // const [values, setValues] = useState(initialValues);
  //
  const handleChange = (name, value) => {

    // setValues((values) => {
    //   return { ...values, [name]: value };
    // });
  //
  };
  //
  function handleSubmit(event) {
    // event.preventDefault();
    // if (typeof onSubmit !== 'function') return;
    // onSubmit(values);
    // setValues(initialValues);
  }

  return (
  <form onSubmit={handleSubmit}>

    <select
        id="softwareCompany"
        name="softwareCompany"
        onChange={(e) => {handleChange("softwareCompany", e.target.value)}}
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
    {/*<select*/}
    {/*    id="types"*/}
    {/*    name="types"*/}
    {/*    onChange={(e) => {handleChange("types", e.target.value)}}*/}
    {/*>*/}
    {/*  {types.length === 0 ?*/}
    {/*      'Ładuje się ...'*/}
    {/*      :*/}
    {/*      types.map(({value, label}) => {*/}
    {/*        return (*/}
    {/*            <option key={value} value={value}>*/}
    {/*              {label}*/}
    {/*            </option>*/}
    {/*        );*/}
    {/*      })*/}
    {/*  }*/}
    {/*</select>*/}
    <br />
    <br />
    {/*<Field*/}
    {/*    label="Model"*/}
    {/*    name="model"*/}
    {/*    type="text"*/}
    {/*    value={values.model}*/}
    {/*    onChange={(e) => handleChange("model", e.target.value)}*/}
    {/*/>*/}
    <input type="submit" value={submitLabel} />
  </form>
  );
}