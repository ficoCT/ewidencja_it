import React, { useEffect, useState } from 'react';
import {
    collection, getFirestore,
    doc, getDocs, addDoc, deleteDoc, updateDoc,
    query, where
} from "firebase/firestore";
import Computer from '../Computer';
import AddComputer from '../AddComputer';
import {app} from "../../firebase";
import QueryComputer from "../QueryComputer";
import Select from 'react-select';

export default function ComputersManagerAdmin() {

    const [computers, setComputers] = useState([]);
    const [queryComputer, setQueryComputer] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const db = getFirestore(app);
    const computersRef = collection(db, 'computers');
    const companyRef = collection(db, 'company');

    async function loadCompany(computersRef) {

        let companyData = [];
        await getDocs(computersRef).then(snapshot => {
            snapshot.docs.forEach(doc => {
                companyData.push({ ...doc.data(), id: doc.id })
            })
        })
        console.log('companyData', companyData);
        return companyData;
    }

    async function loadComputers(computersRef) {

        let computersData = [];
        await getDocs(computersRef).then(snapshot => {
                snapshot.docs.forEach(doc => {
                    computersData.push({ ...doc.data(), id: doc.id })
                })
            })
        return computersData;
    }

      useEffect(() => {
          loadComputers(computersRef).then(computersData => setComputers(computersData));
          loadCompany(companyRef).then(companyData => setCompanies(companyData));
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
           const computerRef = doc(db, 'computers', id)

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
    <div>
      <h1>Lista komputerów w przedsiębiorstwie</h1>
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
      <br />
      <div>
        <AddComputer onSubmit={addComputer} />
      </div>
      <br />
      <div>
         <QueryComputer submitLabel="Wyszukaj" onSubmit={queryComputers} />
      </div>
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
        <hr />
        <h1>Lista modeli komputerów w przedsiębiorstwie</h1>
        <Select
            options={companies}
        />
        <br />
        <Select
            options={companies}
            onChange={setSelectedOption}
        />
    </div>
  );
}
