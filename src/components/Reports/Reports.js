import * as React from 'react';
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {app} from "../../firebase";
import {useEffect} from "react";
import {useState} from "react";
import Container from 'react-bootstrap/Container';

export default function Reports() {

  const db = getFirestore(app);
  const companyRef = collection(db, 'company');

  const [companies, setCompanies] = useState({});

  async function loadCompany() {

    let name = [];
    let companyData = {};
    await getDocs(companyRef).then(snapshot => {
      snapshot.docs.forEach(doc => {
        Object.assign(companyData, {[doc.id]: doc.data()});
        name.push(doc.id);
      })
    })

    console.log('companyData', companyData);

    return {
      name: name,
      companyData: companyData
    };

  }

  useEffect(() => {

    loadCompany(companyRef).then(data => {
      setCompanies(data);
    });

  }, []);

  return (
      <Container className="contents">
          <span style={{color:'red'}}>KOMPUTERY</span>
          {Object.keys(companies).length === 0 ?
              <h1>Ładowanie danych ...</h1>
              :
              <ul>
                {companies.name.map(name => (
                    <li key={name}>
                      Firma: {name} <br/>
                      Laptopy: {companies.companyData[name]['laptops'].length} <br/>
                      Komputery stacjonarne: {companies.companyData[name]['laptops'].length} <br/>
                    </li>
                ))}
              </ul>
          }
          <span style={{color:'red'}}>Ilość użytkowników</span>
            <br/>
            Użytkownicy:
            <br/>
          a  <br/>
      </Container>
  );
}