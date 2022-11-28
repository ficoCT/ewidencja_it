import React, { useEffect, useState } from 'react';
import {app} from "../../firebase";
import {
    collection, getFirestore,
    doc,getDoc, getDocs, addDoc, deleteDoc, updateDoc,
    arrayUnion,
    query, where
} from "firebase/firestore";
import Computer from '../Computer';
import AddComputer from '../AddComputer';
import QueryComputer from "../QueryComputer";
import ToggleVisibility from "../ToggleVisibility";
import ModelForm from "../ModelForm";
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import SoftwareForm from "../SoftwareForm";

export default function Software() {

    const [softwareCompanies, setSoftwareCompanies] = useState([]);
    // const [queryComputer, setQueryComputer] = useState([]);
    // const [companies, setCompanies] = useState([]);
    // const [models, setModels] = useState({});
    // const [users, setUsers] = useState({});
    // const [initialValues, setInitialValues] = useState({});
    //
    const db = getFirestore(app);
    // const softwareRef = collection(db, 'software');
    const softwareCompanyRef = collection(db, 'softwareCompany');
    // const usersRef = collection(db, 'users');
    //
    async function loadSoftwareCompany() {
    //
        let label;
        let softwareCompaniesData = [];
        let companyData = {};
        await getDocs(softwareCompanyRef).then(snapshot => {
            snapshot.docs.forEach(doc => {
                label = doc.id.split("");
                label[0] = label[0].toUpperCase();
                label.toString();
                softwareCompaniesData.push({value: doc.id, label: label});
                Object.assign(companyData, {[doc.id]: doc.data()});
            })
        })
    //     let allModelsCompany = [];
    //     let allModels = {};
    //     for (let company in companyData) {
    //         allModels = companyData[company];
    //         for (let typeModels in allModels) {
    //             for (let model of allModels[typeModels]) {
    //                 allModelsCompany.push(model);
    //             }
    //         }
    //         companyData[company] = allModelsCompany;
    //         allModelsCompany = [];
    //     }
    //
    //     let initialValuesCompany = Object.keys(companyData)[0];
    //     let initialValuesModel = companyData[Object.keys(companyData)[0]][0];
    //
    //     setInitialValues({
    //         company: initialValuesCompany,
    //         model:  initialValuesModel,
    //         materialIndex: 'Tutaj wpisz index materiałowy',
    //         serialNumber: 'Tutaj wpisz numer seryjny'});
    //
        return {
            softwareCompaniesData: softwareCompaniesData,
            companyData: companyData
        };
    //
    }
    //
    // async function loadComputers() {
    //
    //     let softwareData = [];
    //     await getDocs(softwareRef).then(snapshot => {
    //         snapshot.docs.forEach(doc => {
    //             softwareData.push({ ...doc.data(), id: doc.id });
    //         })
    //     })
    //     return softwareData;
    // }
    //
    // async function loadUsers() {
    //
    //     let usersData = [];
    //     await getDocs(usersRef).then(snapshot => {
    //         snapshot.docs.forEach(doc => {
    //             usersData.push({ ...doc.data(), id: doc.id });
    //         })
    //     })
    //
    //     let initialValuesIdUser = usersData[0].id;
    //     let initialValuesUsername = usersData[0].username;
    //
    //     setInitialValues((values) => {
    //         return { ...values, ['idUser']: initialValuesIdUser, ['username']: initialValuesUsername };
    //     });
    //
    //     return usersData;
    // }
    //
    useEffect(() => {

        // loadComputers(softwareRef).then(softwareData => setComputers(softwareData));
        loadSoftwareCompany(softwareCompanyRef).then(data => {
            setSoftwareCompanies(data.softwareCompaniesData);
            // setModels(data.companyData);
        });
        // loadUsers(usersRef).then(data => {
        //     setUsers(data);
        // });

    }, []);
    //
    // async function addComputer(computer) {
    //
    //     const userRef = doc(db, 'users', computer.idUser);
    //     const docSnap = await getDoc(userRef);
    //
    //     addDoc(softwareRef, {
    //         company: computer.company,
    //         materialIndex: computer.materialIndex,
    //         model: computer.model,
    //         serialNumber: computer.serialNumber,
    //         idUser: computer.idUser,
    //         username: docSnap.data().username,
    //         repair: false
    //     })
    //         .then(() => {
    //             loadComputers(softwareRef).then(softwareData => setComputers(softwareData));
    //         })
    //
    // }
    //
    // function updateComputer(id, computer) {
    //     const computerRef = doc(db, 'software', id);
    //
    //     updateDoc(computerRef, {
    //         "company": computer.company,
    //         "model": computer.model,
    //         "materialIndex": computer.materialIndex,
    //         "serialNumber": computer.serialNumber,
    //     })
    //         .then(() => {
    //             loadComputers(softwareRef).then(softwareData => setComputers(softwareData));
    //         })
    //
    // }
    //
    // function deleteComputer(id) {
    //
    //     const computerRef = doc(db, 'software', id)
    //     deleteDoc(computerRef)
    //         .then(() => {
    //             loadComputers(softwareRef).then(softwareData => setComputers(csoftwareData));
    //         })
    //
    // }
    //
    // function queryComputers(values) {
    //
    //     let conditions = []
    //
    //     if (values.company !== "") conditions.push(where("company", "==", values.company));
    //     if (values.model !== "") conditions.push(where("model", "==", values.model));
    //     if (values.materialIndex !== "") conditions.push(where("materialIndex", "==", values.materialIndex));
    //     if (values.serialNumber !== "") conditions.push(where("serialNumber", "==", values.serialNumber));
    //
    //     const q = query(softwareRef, ...conditions);
    //     loadComputers(q).then(qC => setQueryComputer(qC));
    //
    // }
    //
    // function addComputerModel(softwareModel) {
    //
    //     const companyRef = doc(db, "company", softwareModel.company);
    //
    //     updateDoc(companyRef, {
    //         [softwareModel.types]: arrayUnion(softwareModel.model)
    //     })
    //         .then(() => {
    //             loadCompany(companyRef).then(data => {
    //                 setCompanies(data.companiesData);
    //                 setModels(data.companyData);
    //             })});
    //
    // }
    //
    // async function  assignUser(assignment) {
    //
    //     const computerRef = doc(db, 'software', assignment.computerId);
    //     const userRef = doc(db, 'users', assignment.userId);
    //     const docSnap = await getDoc(userRef);
    //
    //     updateDoc(computerRef, {
    //         "idUser": assignment.userId,
    //         "username": docSnap.data().username
    //     })
    //         .then(() => {
    //             loadComputers(softwareRef).then(softwareData => setComputers(softwareData));
    //         })
    //
    // }

    return (
        <Container>
            {/*<Alert variant="primary">*/}
            {/*    <span>LISTA OPROGRAMOWANIA</span>*/}
            {/*</Alert>*/}
            {/*<ToggleVisibility>*/}
            {/*    <div className="contents">*/}
            {/*        {software.length === 0 ?*/}
            {/*            <h1>Ładowanie danych ...</h1>*/}
            {/*            :*/}
            {/*            <ul>*/}
            {/*                {software.map(computer => (*/}
            {/*                    <li key={computer.id}>*/}
            {/*                        <Computer*/}
            {/*                            companiesData={companies}*/}
            {/*                            modelsData={models}*/}
            {/*                            computer={computer}*/}
            {/*                            users={users}*/}
            {/*                            onUpdate={updateComputer}*/}
            {/*                            onDelete={deleteComputer}*/}
            {/*                            assign={assignUser}*/}
            {/*                        />*/}
            {/*                    </li>*/}
            {/*                ))}*/}
            {/*            </ul>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</ToggleVisibility>*/}

            {/*<Alert variant="primary">*/}
            {/*    <span>DODAJ KOMPUTER</span>*/}
            {/*</Alert>*/}
            {/*<ToggleVisibility>*/}
            {/*    <AddComputer companiesData={companies} modelsData={models}  users={users} computer={initialValues} onSubmit={addComputer} />*/}
            {/*</ToggleVisibility>*/}

            {/*<Alert variant="primary">*/}
            {/*    <span>WYSZUKAJ KOMPUTER</span>*/}
            {/*</Alert>*/}
            {/*<ToggleVisibility>*/}
            {/*    <div className="contents">*/}
            {/*        <QueryComputer className="contents" submitLabel="Wyszukaj" onSubmit={queryComputers} />*/}
            {/*        {queryComputer.length === 0 ?*/}
            {/*            ''*/}
            {/*            :*/}
            {/*            <ul>*/}
            {/*                {queryComputer.map(computer => (*/}
            {/*                    <li key={computer.id}>*/}
            {/*                        <Computer*/}
            {/*                            companiesData={companies}*/}
            {/*                            modelsData={models}*/}
            {/*                            computer={computer}*/}
            {/*                            onUpdate={updateComputer}*/}
            {/*                            onDelete={deleteComputer}*/}
            {/*                        />*/}
            {/*                    </li>*/}
            {/*                ))}*/}
            {/*            </ul>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</ToggleVisibility>*/}

            <Alert variant="primary">
                <span>DODAJ PROGRAM</span>
            </Alert>
            <ToggleVisibility>
                <div className="contents">
                    {/*<SoftwareForm className="contents" softwareCompaniesData={softwareCompaniesData} submitLabel={'ZAPISZ'} onSubmit={addComputerModel}/>*/}
                    <SoftwareForm className="contents" softwareCompaniesData={softwareCompanies} submitLabel={'ZAPISZ'}/>
                </div>
            </ToggleVisibility>

        </Container>
    );
}
