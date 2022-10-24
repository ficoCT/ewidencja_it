import React, { useState } from 'react';
import Field from "../Field"
import validate from './validateComputerValues';
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {useEffect} from "react";
import {app} from "../../firebase";

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

  const initialValues = mapComputerToFormValues({ company: 'asus', model: '', materialIndex: 'Tutaj wpisz index', serialNumber: 'Tutaj wpisz numer seryjny'});
  const [values, setValues] = useState(initialValues);
  const [companies, setCompanies] = useState([]);
  const [models, setModels] = useState({});

  const [errorMessages, setErrorMessages] = useState(null);

  const db = getFirestore(app);
  const companyRef = collection(db, 'company');

  const handleChange = (name, value) => {

    setValues((values) => {
      return { ...values, [name]: value };
    });

  };

  async function loadCompany(companyRef) {

    let label;
    let companiesData = [];
    let companyData = {};
    await getDocs(companyRef).then(snapshot => {
      snapshot.docs.forEach(doc => {
        label = doc.id.split("");
        label[0] = label[0].toUpperCase();
        label.toString();
        companiesData.push({value: doc.id, label: label});
        Object.assign(companyData, {[doc.id]: doc.data()});
      })
    })
    let allModelsCompany = [];
    let allModels = {};
    for (let company in companyData) {
      allModels = companyData[company];
      for (let typeModels in allModels) {
        for (let model of allModels[typeModels]) {
          allModelsCompany.push(model);
        }
      }
      companyData[company] = allModelsCompany;
      allModelsCompany = [];
    }

    return {
      companiesData: companiesData,
      companyData: companyData
    };

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

  useEffect(() => {

    loadCompany(companyRef).then(data => {
      setCompanies(data.companiesData);
      setModels(data.companyData);
    });

  }, []);

  return (
  <form onSubmit={handleSubmit}>

    <select
        id="company"
        name="company"
        onChange={(e) => handleChange("company", e.target.value)}
    >
      {companies.length === 0 ?
          'Ładuje się ...'
          :
          companies.map(({value, label}) => {
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
        id="models"
        name="models"
        onChange={(e) => handleChange("model", e.target.value)}
    >
      {Object.keys(models).length === 0 ?
          'Ładuje się ...'
          :
          models[values.company].map(value => {
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
        onChange={(e) => handleChange("materialIndex", e.target.value)}
    />
    <Field
        label="Numer seryjny"
        name="serialNumber"
        type="text"
        value={values.serialNumber}
        errorMessage={errorMessages?.serialNumber}
        onChange={(e) => handleChange("serialNumber", e.target.value)}
    />
    <input type="submit" value={submitLabel} />
  </form>
  );
}