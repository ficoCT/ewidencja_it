import React, { useEffect, useState } from 'react';
import Computer from "../Computer";
import AddComputer from "../AddComputer";
import {collection, getDocs, getFirestore, setDoc} from "firebase/firestore";
import {app} from "../../firebase";

export default function ComputersManager() {

  const [computers, setComputers] = useState([{id: 1, name:'Name 1', company:'company A'},{id:2, name:'Name 2', company:'company 2'}]);
  const [desktop, setDesktop] = useState([]);

  const db = getFirestore(app);

    async function loadComputers() {
        const computers = collection(db, 'desktop');
        const computersSnapshot = await getDocs(computers);
        const allComputers = computersSnapshot.docs.map(doc => doc.data());
        return allComputers;
    }

    useEffect(() => {
        loadComputers().then(desktop => setDesktop(desktop));;
    }, []);

    function addComputer(computer) {

    }

    function updateComputer(id, computer) {

    }

    function deleteComputer(id) {

    }

  return (
    <>
        {console.log('desktop', desktop)}
        <ul>
            {computers.map(computer => (
                <li key={computer.id}>
                    <Computer computer={computer} onUpdate={updateComputer} onDelete={deleteComputer} />
                </li>
            ))}
        </ul>
            <AddComputer onSubmit={addComputer} />
        <ul>
            {desktop.map(desktop => (
                <li key={desktop.registrationNumber}>
                    {desktop.registrationNumber} {' '} {desktop.company}
                </li>
            ))}
        </ul>
    </>
  );
}