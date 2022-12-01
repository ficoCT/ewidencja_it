import * as React from 'react';
import Container from 'react-bootstrap/Container';
import ToggleVisibility from "../ToggleVisibility";
import Alert from "react-bootstrap/Alert";
import HardwareModelForm from "../HardwareModelForm";
import {arrayUnion, collection, doc, getDocs, getFirestore, updateDoc} from "firebase/firestore";
import {app} from "../../firebase";
import {useState} from "react";
import {useEffect} from "react";

export default function OtherHardware() {

    const [initialValues, setInitialValues] = useState({});
    const [deviceCompanies, setDeviceCompanies] = useState([]);
    const [deviceModels, setDeviceModels] = useState({});

    const db = getFirestore(app);
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
        let initialValuesModel = companyData[Object.keys(companyData)[0]][0];

        setInitialValues({
            company: initialValuesCompany,
            model:  initialValuesModel,
            materialIndex: 'Index materiałowy urządzenia',
            serialNumber: 'Numer seryjny urządzenia'});

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
                    setDeviceModels(data.companyData);
                })});

    }

    useEffect(() => {

        loadCompanyDevice(companyDeviceRef).then(data => {
            setDeviceCompanies(data.companiesData);
            setDeviceModels(data.companyData);
        });

    }, []);

  return (
      <Container className="contents">
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