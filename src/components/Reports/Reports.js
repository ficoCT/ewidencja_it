import * as React from 'react';
import { useEffect, useState } from "react";
import { app } from "../../firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";
import LoadingData from "../LoadingData";

export default function Reports() {console.log('re');

  const db = getFirestore(app);
  const companyRef = collection(db, 'company');
  const usersRef = collection(db, 'users');
  const [companies, setCompanies] = useState({});
  const [users, setUsers] = useState({});

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

  useEffect(() => {

    loadCompany(companyRef).then(data => {
      setCompanies(data);
    });
    loadUsers(usersRef).then(data => {
      setUsers(data);
    });

  }, []);

  return (
      <Container className="contents">

          <Alert variant='primary'>
            <h2>KOMPUTERY</h2>
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
                        {companies.companyData[name]['laptops'].length} </span> <br/>
                      </div>
                  ))}
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

      </Container>
  );
}