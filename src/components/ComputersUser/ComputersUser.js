import React, { useState } from 'react';
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {app} from "../../firebase";
import {useEffect} from "react";
import ViewComputer from "../ViewComputer";
import ViewUser from "../ViewUser";
import Container from 'react-bootstrap/Container';

export default function ComputersUser() {

  const [userData, setUserData] = useState({computersData: [], userData: []});

  const db = getFirestore(app);
  const computersRef = collection(db, 'computers');
  const userRef = collection(db, 'users');

  async function loadComputersAndUser() {

    let computersData = [];
    let userData = [];
    const qk = query(computersRef, where("idUser", "==", "80nfJBTHtsbdecCGk8sJ1IE9ws02"));
    const qu = query(userRef, where("id", "==", "80nfJBTHtsbdecCGk8sJ1IE9ws02"));

    await getDocs(qk).then(snapshot => {
      snapshot.docs.forEach(doc => {
        computersData.push({ ...doc.data(), id: doc.id });
      })
    })

    await getDocs(qu).then(snapshot => {
      snapshot.docs.forEach(doc => {
        userData.push({ ...doc.data(), id: doc.id });
      })
    })

    return {computersData: computersData, userData: userData};
  }

  useEffect(() => {

    loadComputersAndUser().then(qC => setUserData(qC));

  }, []);

  return (
      <Container>
        <span style={{color:'red'}}>Dane użytkownika</span>
        {userData['userData'].length === 0 ?
            <h1>Ładowanie danych ...</h1>
            :
            userData['userData'].map(user => (
                <li key={user.id}>
                  <ViewUser user={user} />
                </li>
            ))
        }
        <br/>
        <br/>
        <span style={{color:'red'}}>Lista komputerów użytkownika</span>
        <ul>
        {userData['computersData'].length === 0 ?
            <h1>Ładowanie danych ...</h1>
            :
            userData['computersData'].map(computer => (
              <li key={computer.id}>
              <ViewComputer computer={computer} />
              </li>
            ))
        }
        </ul>
      </Container>
  );
}