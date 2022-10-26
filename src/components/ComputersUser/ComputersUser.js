import React, { useState } from 'react';
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {app} from "../../firebase";
import {useEffect} from "react";
import ViewComputer from "../ViewComputer";

export default function ComputersUser() {

  const [computersUser, setComputersUser] = useState([]);

  const db = getFirestore(app);
  const computersRef = collection(db, 'computers');

  async function loadComputers() {

    let computersData = [];
    const q = query(computersRef, where("idUser", "==", "80nfJBTHtsbdecCGk8sJ1IE9ws02"));

    await getDocs(q).then(snapshot => {
      snapshot.docs.forEach(doc => {
        computersData.push({ ...doc.data(), id: doc.id });
      })
    })
    console.log('computersData', computersData);
    return computersData;
  }

  useEffect(() => {

    loadComputers().then(qC => setComputersUser(qC));

  }, []);

  return (
    <>
      <span style={{color:'red'}}>Dane użytkownika</span>
      
      <br/>
      <br/>
      <span style={{color:'red'}}>Lista komputerów użytkownika</span>
      <ul>
        {computersUser.map(computer => (
            <li key={computer.id}>
              <ViewComputer computer={computer} />
            </li>
        ))}
      </ul>
    </>
  );
}