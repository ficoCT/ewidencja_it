import React, {useEffect, useState} from 'react';
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";
import { app } from '../../firebase';
import {Container, Table} from "react-bootstrap";

export default function Administration() {

  const [computers, setComputers] = useState([]);
  const db = getFirestore(app);

  async function getComputers() {

    const laptopsRef = collection(db, "laptops");
    await setDoc(doc(laptopsRef, "models"), {
      dell: [{registrationNumber: '1L', name: 'Latitude 7480'}],
    });

    const desktopRef = collection(db, "desktop");
    await setDoc(doc(desktopRef, "models"), {
      dell: [{registrationNumber: '1D', name: 'Optiplex 780'}],
    });

    const computers = collection(db, 'desktop');
    const computersSnapshot = await getDocs(computers);
    const allComputers = computersSnapshot.docs.map(doc => doc.data());
    return allComputers;
  }

  useEffect(() => {
    getComputers(db).then(computers => setComputers(computers));
  },[]);

  return (
      <Container>
        <h1>Administration</h1>
        Dane załadowane do bazy ...
      </Container>
  );
}

