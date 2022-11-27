import React, { useEffect, useState } from 'react';
import {app} from "../../firebase";
import {
    collection, getFirestore,
    doc,getDoc, getDocs, addDoc, deleteDoc, updateDoc,
    arrayUnion, arrayRemove,
    query, where
} from "firebase/firestore";
import Computer from '../Computer';
import AddComputer from '../AddComputer';
import QueryComputer from "../QueryComputer";
import ToggleVisibility from "../ToggleVisibility";
import Container from 'react-bootstrap/Container';
import ModelForm from "../ModelForm";
import Alert from 'react-bootstrap/Alert';

export default function ComputersManagerAdmin() {

    const [computers, setComputers] = useState([]);
    const [queryComputer, setQueryComputer] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [models, setModels] = useState({});
    const [users, setUsers] = useState({});
    const [initialValues, setInitialValues] = useState({});

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

        let initialValuesIdUser = usersData[0].id;
        let initialValuesUsername = usersData[0].username;

        setInitialValues((values) => {
            return { ...values, ['idUser']: initialValuesIdUser, ['username']: initialValuesUsername };
        });

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

      async function addComputer(computer) {

          const userRef = doc(db, 'users', computer.idUser);
          const docSnap = await getDoc(userRef);

          addDoc(computersRef, {
              company: computer.company,
              materialIndex: computer.materialIndex,
              model: computer.model,
              serialNumber: computer.serialNumber,
              idUser: computer.idUser,
              username: docSnap.data().username
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
        })
            .then(() => {
                loadCompany(companyRef).then(data => {
                    setCompanies(data.companiesData);
                    setModels(data.companyData);
        })});

    }

    async function  assignUser(assignment) {

        const computerRef = doc(db, 'computers', assignment.computerId);
        const userRef = doc(db, 'users', assignment.userId);
        const docSnap = await getDoc(userRef);

        updateDoc(computerRef, {
            "idUser": assignment.userId,
            "username": docSnap.data().username
        })
            .then(() => {
                loadComputers(computersRef).then(computersData => setComputers(computersData));
            })

    }

  return (
      <Container>
          <Alert variant="primary">
              <span>LISTA KOMPUTERÓW W PRZEDSIĘBIORSTWIE</span>
          </Alert>
          <ToggleVisibility>
          <div className="contents">
              {computers.length === 0 ?
                  <h1>Ładowanie danych ...</h1>
                  :
                  <ul>
                    {computers.map(computer => (
                      <li key={computer.id}>
                            <Computer
                                companiesData={companies}
                                modelsData={models}
                                computer={computer}
                                users={users}
                                onUpdate={updateComputer}
                                onDelete={deleteComputer}
                                assign={assignUser}
                            />
                      </li>
                    ))}
                  </ul>
              }
          </div>
          </ToggleVisibility>

          <Alert variant="primary">
              <span>DODAJ KOMPUTER</span>
          </Alert>
          <ToggleVisibility>
            <AddComputer companiesData={companies} modelsData={models}  users={users} computer={initialValues} onSubmit={addComputer} />
          </ToggleVisibility>

          <Alert variant="primary">
              <span>WYSZUKAJ KOMPUTER</span>
          </Alert>
          <ToggleVisibility>
          <div className="contents">
              <QueryComputer className="contents" submitLabel="Wyszukaj" onSubmit={queryComputers} />
                  {queryComputer.length === 0 ?
                       ''
                       :
                       <ul>
                           {queryComputer.map(computer => (
                              <li key={computer.id}>
                                  <Computer
                                      companiesData={companies}
                                      modelsData={models}
                                      computer={computer}
                                      onUpdate={updateComputer}
                                      onDelete={deleteComputer}
                                  />
                              </li>
                           ))}
                       </ul>
                  }
          </div>
          </ToggleVisibility>

          <Alert variant="primary">
              <span>DODAJ MODEL KOMPUTERA</span>
          </Alert>
          <ToggleVisibility>
              <div className="contents">
                <ModelForm className="contents" companiesData={companies} submitLabel={'ZAPISZ'} onSubmit={addComputerModel}/>
              </div>
          </ToggleVisibility>

      </Container>
  );
}
