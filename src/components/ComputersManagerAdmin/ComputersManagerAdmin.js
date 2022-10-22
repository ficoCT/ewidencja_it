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
    const [values, setValues] = useState({company: 'dell', models: ''});

    const db = getFirestore(app);
    const computersRef = collection(db, 'computers');
    const companyRef = collection(db, 'company');

    const selectItems = {
        name: "size",
        fields: {
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

    const handleChange = (name, value) => {
        setValues((s) => {
            return { ...s, [name]: value };
        });
    };

    async function loadCompany(companyRef) {

        let label;
        let companiesData = [];
        let companyData = [];
        await getDocs(companyRef).then(snapshot => {
            snapshot.docs.forEach(doc => {
                companyData.push({ ...doc.data(), id: doc.id });
                label = doc.id.split("");
                label[0] = label[0].toUpperCase();
                label.toString();
                companiesData.push({value: doc.id, label: label});
            })
        })
        console.log('computersData', companiesData);
        return {companiesData: companiesData, companyData: companyData};
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

        const q = query(computersRef, where("company", "==", values.company));
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
                    <Computer computer={computer} onUpdate={updateComputer} onDelete={deleteComputer} />
                  </li>
                ))}
              </ul>
          }
      </div>
      </ToggleVisibility>

      <span style={{color:'red'}}>DODAJ KOMPUTER</span>
      <ToggleVisibility>
        <AddComputer onSubmit={addComputer} />
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
                          <Computer computer={computer} onUpdate={updateComputer} onDelete={deleteComputer} />
                      </li>
                   ))}
               </ul>
          }
      </ToggleVisibility>

      <span style={{color:'red'}}>Lista modeli komputerów w przedsiębiorstwie</span>
      <ToggleVisibility>
      <div>
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
          onChange={(e) => handleChange("models", e.target.value)}
      >
          {selectItems.fields[values.company].map(({ value, selected }) => {
               return (
                  <option key={value} value={value}>
                      {value}
                  </option>
               );
          })}
      </select>
      </div>
      </ToggleVisibility>

    </>
  );
}
