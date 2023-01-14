import * as React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { app } from "../../firebase";
import {addDoc, arrayUnion, collection, doc, getDocs, getFirestore, updateDoc} from "firebase/firestore";
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";
import HardwareModelForm from "../HardwareModelForm";
import ToggleVisibility from "../ToggleVisibility";
import LoadingData from "../LoadingData";
import Program from "../Program";
import AddHardware from "../AddHardware";
import Hardware from "../Hardware";

export default function OtherHardware() {

    const [otherHardware, setOtherHardware] = useState([]);
    const [deviceCompanies, setDeviceCompanies] = useState([]);
    const [users, setUsers] = useState({});
    const [initialValuesOtherHardware, setInitialValuesOtherHardware] = useState({});
    const [hardwareTypes, setHardwareTypes] = useState({});

    const db = getFirestore(app);
    const otherHardwareRef = collection(db, 'otherHardware');
    const companyDeviceRef = collection(db, 'companyDevice');

    async function loadCompanyDevice() {

        let label;
        let companiesData = [];
        let companyData = {};
        await getDocs(companyDeviceRef).then(snapshot => {
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
        let initialValuesHardware = companyData[Object.keys(companyData)[0]][0];
        setInitialValuesOtherHardware({
            company: initialValuesCompany,
            name:  initialValuesHardware,
            key: 'XXX XXX XXX'});

        return {
            companiesData: companiesData,
            companyData: companyData
        };

    }

    function addDeviceModel(deviceModel) {

        const db = getFirestore(app);
        const companyDeviceRef = doc(db, "companyDevice", deviceModel.company);

        updateDoc(companyDeviceRef, {
            [deviceModel.types]: arrayUnion(deviceModel.model)
        })
            .then(() => {
                loadCompanyDevice(companyDeviceRef).then(data => {
                    setDeviceCompanies(data.companiesData);
                    setHardwareTypes(data.companyData);
                })});

    }

    async function loadOtherHardware() {

        let otherHardwareData = [];
        await getDocs(otherHardwareRef).then(snapshot => {
            snapshot.docs.forEach(doc => {
                otherHardwareData.push({ ...doc.data(), id: doc.id });
            })
        })
        return otherHardwareData;
    }

    useEffect(() => {

        loadOtherHardware(otherHardwareRef).then(otherHardware => setOtherHardware(otherHardware));
        loadCompanyDevice(companyDeviceRef).then(data => {
            setDeviceCompanies(data.companiesData);
            setHardwareTypes(data.companyData);
        });

    }, []);

    async function addOtherHardware(otherHardware) {

        addDoc(otherHardwareRef, {
            company: otherHardware.company,
            name: otherHardware.name,
            key: otherHardware.key
        })
            .then(() => {
                loadOtherHardware(otherHardwareRef).then(otherHardware =>
                    setOtherHardware(otherHardware));
            })

    }

  return (
      <Container className="contents">
          <Alert variant="primary">
              <span>LISTA URZĄDZEŃ</span>
          </Alert>
          <ToggleVisibility>
              <div className="contents">
                  {otherHardware.length === 0 ?
                      <LoadingData/>
                      :
                      <>
                          {otherHardware.map(hardware => (
                              <div key={hardware.id}>
                                  <Hardware
                                      hardware={hardware}
                                  />
                              </div>
                          ))}
                      </>
                  }
              </div>
          </ToggleVisibility>
          <Alert variant="primary">
              <span>DODAJ URZĄDZENIE</span>
          </Alert>
          <ToggleVisibility>
              <AddHardware
                  otherHardwareCompaniesData={deviceCompanies}
                  otherHardwareData={hardwareTypes}
                  users={users}
                  otherHardware={initialValuesOtherHardware}
                  onSubmit={addOtherHardware}
             />
          </ToggleVisibility>
          <Alert variant="primary">
              <span>DODAJ MODEL URZĄDZENIA</span>
          </Alert>
          <ToggleVisibility>
              <div className="contents">
                  <HardwareModelForm className="contents" companiesData={deviceCompanies} submitLabel={'ZAPISZ'} onSubmit={addDeviceModel}/>
              </div>
          </ToggleVisibility>
      </Container>
  );
}