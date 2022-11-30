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
import SoftwareForm from "../SoftwareModelForm";
import AddSoftware from "../AddSoftware";

export default function Software() {

    const [softwareCompanies, setSoftwareCompanies] = useState([]);
    // const [queryComputer, setQueryComputer] = useState([]);
    // const [companies, setCompanies] = useState([]);
    const [software, setSoftware] = useState({});
    const [programTypes, setProgramTypes] = useState({});
    const [users, setUsers] = useState({});
    const [initialValuesProgram, setInitialValuesProgram] = useState({});

    const db = getFirestore(app);
    // const softwareRef = collection(db, 'software');
    const softwareRef = collection(db, 'software');
    const softwareCompanyRef = collection(db, 'softwareCompany');
    // const usersRef = collection(db, 'users');
    //
    async function loadSoftwareCompany() {

        let label;
        let softwareCompaniesData = [];
        let companiesData = {};
        await getDocs(softwareCompanyRef).then(snapshot => {
            snapshot.docs.forEach(doc => {
                label = doc.id.split("");
                label[0] = label[0].toUpperCase();
                label.toString();
                softwareCompaniesData.push({value: doc.id, label: label});
                Object.assign(companiesData, {[doc.id]: doc.data()});
            })
        })

        return {
            softwareCompaniesData: softwareCompaniesData,
            companiesData: companiesData
        };

    }

    async function loadPrograms() {

        let softwareData = [];
        await getDocs(softwareRef).then(snapshot => {
            snapshot.docs.forEach(doc => {
                softwareData.push({ ...doc.data(), id: doc.id });
            })
        })
        return softwareData;
    }

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

        loadPrograms(softwareRef).then(softwareData => setSoftware(softwareData));
        loadSoftwareCompany(softwareCompanyRef).then(data => {
            setSoftwareCompanies(data.softwareCompaniesData);
            setSoftware(data.companiesData);
        });

    }, []);

    async function addProgram(program) {

        addDoc(softwareRef, {
            company: program.company,
            name: program.name,
            key: program.key
        })
            .then(() => {
                loadPrograms(softwareRef).then(softwareData => setSoftware(softwareData));
            })

    }

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

    function addTypeProgram(softwareProgram) {

        addDoc(softwareRef, {
            company: softwareProgram.company,
            type: softwareProgram.type,
            name: softwareProgram.name
        })
            .then(() => {
                loadPrograms(softwareRef).then(softwareData => setSoftware(softwareData));
            })

    }

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
            <Alert variant="primary">
                <span>LISTA OPROGRAMOWANIA</span>
            </Alert>
            <ToggleVisibility>
                <div className="contents">
                    {/*{computers.length === 0 ?*/}
                    {/*    <h1>Ładowanie danych ...</h1>*/}
                    {/*    :*/}
                    {/*    <ul>*/}
                    {/*        {computers.map(computer => (*/}
                    {/*            <li key={computer.id}>*/}
                    {/*                <Computer*/}
                    {/*                    companiesData={companies}*/}
                    {/*                    modelsData={models}*/}
                    {/*                    computer={computer}*/}
                    {/*                    users={users}*/}
                    {/*                    onUpdate={updateComputer}*/}
                    {/*                    onDelete={deleteComputer}*/}
                    {/*                    assign={assignUser}*/}
                    {/*                />*/}
                    {/*            </li>*/}
                    {/*        ))}*/}
                    {/*    </ul>*/}
                    {/*}*/}
                </div>
            </ToggleVisibility>

            <Alert variant="primary">
                <span>DODAJ PROGRAM</span>
            </Alert>
            <ToggleVisibility>
                <AddSoftware softwareCompaniesData={softwareCompanies} softwareData={programTypes}  users={users} program={initialValuesProgram} onSubmit={addProgram} />
            </ToggleVisibility>

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
                <span>DODAJ RODZAJ PROGRAMU</span>
            </Alert>
            <ToggleVisibility>
                <div className="contents">
                    {/*<SoftwareModelForm className="contents" softwareCompaniesData={softwareCompaniesData} submitLabel={'ZAPISZ'} onSubmit={addComputerModel}/>*/}
                    <SoftwareForm className="contents" softwareCompaniesData={softwareCompanies} onSubmit={addTypeProgram} submitLabel={'ZAPISZ'}/>
                </div>
            </ToggleVisibility>

        </Container>
    );
}
