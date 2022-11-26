import React, { useEffect, useState } from 'react';
import {app} from "../../firebase";
import {
    collection, getFirestore,
    doc, getDocs, addDoc, deleteDoc, updateDoc,
    arrayUnion, arrayRemove,
    query, where
} from "firebase/firestore";
import Computer from '../Computer';
import AddComputer from '../AddComputer';
import QueryComputer from "../QueryComputer";
import ToggleVisibility from "../ToggleVisibility";
import Container from 'react-bootstrap/Container';
import ModelForm from "../ModelForm";

export default function ComputersManagerAdmin() {

    const [computers, setComputers] = useState([]);
    const [queryComputer, setQueryComputer] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [models, setModels] = useState({});
    const [users, setUsers] = useState({});
    const [initialValues, setInitialValues] = useState({company: '', model:  '', materialIndex: '', serialNumber: ''});

    const db = getFirestore(app);
    const computersRef = collection(db, 'computers');
    const companyRef = collection(db, 'company');
    const usersRef = collection(db, 'users');

    async function loadCompany() {

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

        return {
            companiesData: companiesData,
            companyData: companyData
        };

    }

    async function loadComputers() {

        let computersData = [];
        await getDocs(computersRef).then(snapshot => {
                snapshot.docs.forEach(doc => {
                    computersData.push({ ...doc.data(), id: doc.id });
                })
            })
        return computersData;
    }

    async function loadUsers() {

        let usersData = [];
        await getDocs(usersRef).then(snapshot => {
            snapshot.docs.forEach(doc => {
                usersData.push({ ...doc.data(), id: doc.id });
            })
        })
        return usersData;
    }

      useEffect(() => {

          loadComputers(computersRef).then(computersData => setComputers(computersData));
          loadCompany(companyRef).then(data => {
              setCompanies(data.companiesData);
              setModels(data.companyData);
          });
          loadUsers(usersRef).then(data => {
              setUsers(data);
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

    function addComputerModel(computerModel) {

        const companyRef = doc(db, "company", computerModel.company);

        updateDoc(companyRef, {
            [computerModel.types]: arrayUnion(computerModel.model)
        });

    }

    function assign(assignment) {

        const computerRef = doc(db, 'computers', assignment.computerId);

        updateDoc(computerRef, {
            "idUser": assignment.userId,
        })
            .then(() => {
                loadComputers(computersRef).then(computersData => setComputers(computersData));
            })

    }

  return (
      <Container className="contents">
          <span style={{color:'red'}}>Lista komputerów w przedsiębiorstwie</span>
          <ToggleVisibility>
          <div>
              {computers.length === 0 ?
                  <h1>Ładowanie danych ...</h1>
                  :
                  <ul>
                    {computers.map(computer => (
                      <li key={computer.id}>
                        <Computer companiesData={companies} modelsData={models} computer={computer} users={users} onUpdate={updateComputer} onDelete={deleteComputer} assign={assign}/>
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
          <span style={{color:'red'}}>DODAJ MODEL KOMPUTERA</span>
          <ToggleVisibility>
              <ModelForm companiesData={companies} submitLabel={'ZAPISZ'} onSubmit={addComputerModel}/>
          </ToggleVisibility>

      </Container>
  );
}
