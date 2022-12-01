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
import ComputerModelForm from "../ModelForm";
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import SoftwareForm from "../SoftwareModelForm";
import AddSoftware from "../AddSoftware";
import SoftwareModelForm from "../SoftwareModelForm";
import Program from "../Program";

export default function Software() {

    const [softwareCompanies, setSoftwareCompanies] = useState([]);
    // const [queryComputer, setQueryComputer] = useState([]);
    // const [companies, setCompanies] = useState([]);
    const [software, setSoftware] = useState([]);
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
        let companiesData = [];
        let companyData = {};
        await getDocs(softwareCompanyRef).then(snapshot => {
            snapshot.docs.forEach(doc => {
                label = doc.id.split("");
                label[0] = label[0].toUpperCase();
                label.toString();
                companiesData.push({value: doc.id, label: label});
                Object.assign(companyData, {[doc.id]: doc.data()});
            })
        });
        let allSoftwareCompany = [];
        let allPrograms = {};
        for (let company in companyData) {
            allPrograms = companyData[company];
            for (let typeSoftware in allPrograms) {
                for (let program of allPrograms[typeSoftware]) {
                    allSoftwareCompany.push(program);
                }
            }
            companyData[company] = allSoftwareCompany;
            allSoftwareCompany = [];
        }

        let initialValuesCompany = Object.keys(companyData)[0];
        let initialValuesProgram = companyData[Object.keys(companyData)[0]][0];

        setInitialValuesProgram({
            company: initialValuesCompany,
            type:  initialValuesProgram,
            name: 'Nazwa programu',
            key: 'XXX XXX XXX'});

        return {
            companiesData: companiesData,
            companyData: companyData
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

    useEffect(() => {

        loadPrograms(softwareRef).then(software => setSoftware(software));
        loadSoftwareCompany(softwareCompanyRef).then(data => {
            setSoftwareCompanies(data.companiesData);
            setProgramTypes(data.companyData);
        });
    }, []);

    async function addProgram(program) {

        addDoc(softwareRef, {
            company: program.company,
            name: program.name,
            key: program.key
        })
            .then(() => {
                loadPrograms(softwareRef).then(software =>
                    setSoftware(software));
            })

    }

    function addTypeProgram(softwareProgram) {

        const softwareProgramCompanyRef = doc(db, "softwareCompany", softwareProgram.company);

        updateDoc(softwareProgramCompanyRef, {
            [softwareProgram.type]: arrayUnion(softwareProgram.name)
        })
            .then(() => {
                loadSoftwareCompany(softwareCompanyRef).then(data => {
                    setSoftwareCompanies(data.companiesData);
                    setProgramTypes(data.companyData);
                })});

    }

    return (
        <Container>
            <Alert variant="primary">
                <span>LISTA OPROGRAMOWANIA</span>
            </Alert>
            <ToggleVisibility>
                <div className="contents">
                    {software.length === 0 ?
                        <h1>Ładowanie danych ...</h1>
                        :
                        <>
                            {software.map(program => (
                                <div key={program.id}>
                                    <Program
                                        program={program}
                                    />
                                </div>
                            ))}
                        </>
                    }
                </div>
            </ToggleVisibility>

            <Alert variant="primary">
                <span>DODAJ PROGRAM</span>
            </Alert>
            <ToggleVisibility>
                <AddSoftware softwareCompaniesData={softwareCompanies} softwareData={programTypes}  users={users} software={initialValuesProgram} onSubmit={addProgram} />
            </ToggleVisibility>

            <Alert variant="primary">
                <span>DODAJ RODZAJ PROGRAMU</span>
            </Alert>
            <ToggleVisibility>
                <div className="contents">
                    <SoftwareModelForm className="contents" softwareCompaniesData={softwareCompanies} onSubmit={addTypeProgram} submitLabel={'ZAPISZ'}/>
                </div>
            </ToggleVisibility>

        </Container>
    );
}
