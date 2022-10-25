import React, { useEffect, useState } from 'react';
import {app} from "../../firebase";
import {
    collection, getFirestore,
    doc, getDocs, addDoc, deleteDoc, updateDoc,
    query, where
} from "firebase/firestore";
import Computer from '../Computer';
import AddComputer from '../AddComputer';
import QueryComputer from "../QueryComputer";
import ToggleVisibility from "../ToggleVisibility";

export default function ComputersManagerAdmin() {

    const [computers, setComputers] = useState([]);
    const [queryComputer, setQueryComputer] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [models, setModels] = useState({});
    const [initialValues, setInitialValues] = useState({company: '', model:  '', materialIndex: '', serialNumber: ''});

    const db = getFirestore(app);
    const computersRef = collection(db, 'computers');
    const companyRef = collection(db, 'company');

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

        let initialValuesCompany = Object.keys(companyData)[0];
        let initialValuesModel = companyData[Object.keys(companyData)[0]][0];

            setInitialValues({
            company: initialValuesCompany,
            model:  initialValuesModel,
            materialIndex: 'Tutaj wpisz index materiałowy',
            serialNumber: 'Tutaj wpisz numer seryjny'});

            console.log('initialValues', initialValues);

        return {
            companiesData: companiesData,
            companyData: companyData
        };

    }

    async function loadComputers(computersRef) {

        let computersData = [];
        await getDocs(computersRef).then(snapshot => {
                snapshot.docs.forEach(doc => {
                    computersData.push({ ...doc.data(), id: doc.id });
                })
            })
        return computersData;
    }

      useEffect(() => {

          loadComputers(computersRef).then(computersData => setComputers(computersData));
          loadCompany(companyRef).then(data => {
              setCompanies(data.companiesData);
              setModels(data.companyData);
          });

      }, []);

      function addComputer(computer) {

          addDoc(computersRef, {
              company: computer.company,
              materialIndex: computer.materialIndex,
              model: computer.model,
              serialNumber: computer.serialNumber
          })
              .then(() => {
                  loadComputers(computersRef).then(computersData => setComputers(computersData));
              })

      }

      function updateComputer(id, computer) {
           const computerRef = doc(db, 'computers', id);

           updateDoc(computerRef, {
              "company": computer.company,
              "model": computer.model,
              "materialIndex": computer.materialIndex,
              "serialNumber": computer.serialNumber,
          })
               .then(() => {
               loadComputers(computersRef).then(computersData => setComputers(computersData));
           })

      }

      function deleteComputer(id) {

          const computerRef = doc(db, 'computers', id)
          deleteDoc(computerRef)
              .then(() => {
                  loadComputers(computersRef).then(computersData => setComputers(computersData));
              })

      }

    function queryComputers(values) {

        let conditions = []

        if (values.company !== "") conditions.push(where("company", "==", values.company));
        if (values.model !== "") conditions.push(where("model", "==", values.model));
        if (values.materialIndex !== "") conditions.push(where("materialIndex", "==", values.materialIndex));
        if (values.serialNumber !== "") conditions.push(where("serialNumber", "==", values.serialNumber));

        const q = query(computersRef, ...conditions);
        loadComputers(q).then(qC => setQueryComputer(qC));

    }

  return (
    <>

      <span style={{color:'red'}}>Lista komputerów w przedsiębiorstwie</span>
      <ToggleVisibility>
      <div>
          {computers.length === 0 ?
              <h1>Ładowanie danych ...</h1>
              :
              <ul>
                {computers.map(computer => (
                  <li key={computer.id}>
                    <Computer companiesData={companies} modelsData={models} computer={computer} onUpdate={updateComputer} onDelete={deleteComputer} />
                  </li>
                ))}
              </ul>
          }
      </div>
      </ToggleVisibility>

      <span style={{color:'red'}}>DODAJ KOMPUTER</span>
      <ToggleVisibility>
        <AddComputer companiesData={companies} modelsData={models} computer={initialValues} onSubmit={addComputer} />
      </ToggleVisibility>

      <span style={{color:'red'}}>WYSZUKAJ KOMPUTER</span>
      <ToggleVisibility>
      <QueryComputer submitLabel="Wyszukaj" onSubmit={queryComputers} />
          {queryComputer.length === 0 ?
               ''
               :
               <ul>
                   {queryComputer.map(computer => (
                      <li key={computer.id}>
                          <Computer companiesData={companies} modelsData={models} computer={computer} onUpdate={updateComputer} onDelete={deleteComputer} />
                      </li>
                   ))}
               </ul>
          }
      </ToggleVisibility>

    </>
  );
}
