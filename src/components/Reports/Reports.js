import * as React from 'react';
import { useEffect, useState } from "react";
import { app } from "../../firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";
import LoadingData from "../LoadingData";

export default function Reports() {

  const [companies, setCompanies] = useState({});
  const [users, setUsers] = useState({});
  const [software, setSoftware] = useState([]);
  const [otherHardware, setOtherHardware] = useState([]);
  const [computers, setComputers] = useState([]);
  const db = getFirestore(app);
  const companyRef = collection(db, 'company');
  const usersRef = collection(db, 'users');
  const softwareRef = collection(db, 'software');
  const computersRef = collection(db, 'computers');
  const otherHardwareRef = collection(db, 'otherHardware');

  async function loadCompany() {

    let name = [];
    let companyData = {};
    let nameCompany = "";
    await getDocs(companyRef).then(snapshot => {
      snapshot.docs.forEach(doc => {
        Object.assign(companyData, {[doc.id]: doc.data()});
        name.push(doc.id);
      })
    })

    return {
      name: name,
      companyData: companyData
    };

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

  async function loadPrograms() {

    let softwareData = [];
    await getDocs(softwareRef).then(snapshot => {
      snapshot.docs.forEach(doc => {
        softwareData.push({ ...doc.data(), id: doc.id });
      })
    })

    return softwareData;

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

  async function loadComputers(loadComputersRef) {

    let computersData = [];
    await getDocs(loadComputersRef).then(snapshot => {
      snapshot.docs.forEach(doc => {
        computersData.push({ ...doc.data(), id: doc.id });
      })
    })

    return computersData;

  }

  useEffect(() => {

    loadCompany(companyRef).then(data => {
      setCompanies(data);
    });
    loadUsers(usersRef).then(data => {
      setUsers(data);
    });
    loadPrograms(softwareRef).then(software => setSoftware(software));
    loadComputers(computersRef).then(computersData => setComputers(computersData));
    loadOtherHardware(otherHardwareRef).then(otherHardware => setOtherHardware(otherHardware));

  }, []);

  return (
      <Container className="contents">

          <Alert variant='primary'>
            <h2>LISTA ILOŚCI SPRZĘTU TELEINFORMATYCZNEGO ORAZ PROGRAMÓW</h2>
            {software === 0 &&  otherHardware === 0 && computers === 0?
                <LoadingData/>
                :
                <>
                  <div className="reports">
                      <span>W bazie znajduje się <span className="importantText"> {software.length}
                      </span> zarejestrowanych programów.</span>
                    <br/>
                  </div>
                  <div className="reports">
                      <span>W bazie znajdują się <span className="importantText"> {computers.length}
                      </span> komputery.</span>
                    <br/>
                  </div>
                  <div className="reports">
                      <span>W bazie znajduje się <span className="importantText"> {otherHardware.length}
                      </span> sztuk innego sprzętu teleinformatycznego.</span>
                    <br/>
                  </div>
                </>
            }
          </Alert>
        <Alert variant='primary'>
          <h2>UŻYTKOWNICY</h2>
          {users === 0 ?
              <LoadingData/>
              :
                    <div className="reports">
                      <span>W bazie znajduje się <span className="importantText"> {users.length}
                      </span> aktywnych użytkowników.</span>
                       <br/>
                    </div>
          }
        </Alert>
        <Alert variant='primary'>
          <h2>KOMPUTERY - ILOŚĆ MODELI W BAZIE</h2>
          {Object.keys(companies).length === 0 ?
              <LoadingData/>
              :
              <>
                {companies.name.map(name => (
                    <div key={name} className="reports">
                      <h3>{name.toUpperCase()}</h3>
                      Laptopy: <span className="importantText"> {companies.companyData[name]['laptops'].length}
                      </span> <br/>
                      Komputery stacjonarne: <span className="importantText">
                        {companies.companyData[name]['desktops'].length} </span> <br/>
                    </div>
                ))}
              </>
          }
        </Alert>
      </Container>
  );
}