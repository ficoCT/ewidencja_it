import React, { useEffect, useState } from 'react';
import {collection, doc, getDocs, addDoc, deleteDoc,  getFirestore, setDoc, onSnapshot, updateDoc} from "firebase/firestore";
import Computer from '../Computer';
import AddComputer from '../AddComputer';
import {app} from "../../firebase";

export default function ComputersManagerAdmin() {

    const [computers, setComputers] = useState([]);
    const db = getFirestore(app);
    const computersRef = collection(db, 'computers');

    async function loadComputers(computersRef) {

        let computersData = [];
        await getDocs(computersRef).then(snapshot => {
                snapshot.docs.forEach(doc => {
                    computersData.push({ ...doc.data(), id: doc.id })
                })
            })
        return computersData;
    }

  useEffect(() => {
      loadComputers(computersRef).then(computersData => setComputers(computersData));
  }, []);

  function addComputer(computer) {

      addDoc(computersRef, {
          company: computer.company,
          materialIndex: computer.materialIndex,
          model: computer.model,
          serialNumber: computer.serialNumber
      })
          .then(() => {
              loadComputers(computersRef).then(computersData => setComputers(computersData));
          })
  }

  function updateComputer(id, computer) {
       const computerRef = doc(db, 'computers', id)

       updateDoc(computerRef, {
          "company": computer.company,
          "model": computer.model,
          "materialIndex": computer.materialIndex,
          "serialNumber": computer.serialNumber,
      })
           .then(() => {
           loadComputers(computersRef).then(computersData => setComputers(computersData));
       })

  }

  function deleteComputer(id) {
      const computerRef = doc(db, 'computers', id)

      deleteDoc(computerRef)
          .then(() => {
              loadComputers(computersRef).then(computersData => setComputers(computersData));
          })
  }

  return (
    <div>
      {computers.length === 0 ?
          <h1>Ładowanie danych ...</h1>
          :
          <ul>
            {computers.map(computer => (
              <li key={computer.id}>
                <Computer computer={computer} onUpdate={updateComputer} onDelete={deleteComputer} />
              </li>
            ))}
          </ul>
      }
      <div>
        <AddComputer onSubmit={addComputer} />
      </div>
    </div>
  );
}
