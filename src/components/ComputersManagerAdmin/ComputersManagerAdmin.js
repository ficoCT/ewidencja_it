import React, { useEffect, useState } from 'react';
import {collection, doc, getDocs, addDoc, deleteDoc,  getFirestore, setDoc} from "firebase/firestore";
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
      loadComputers(computersRef).then(computersData => setComputers(computersData));;
  }, []);

  function addComputer(computer) {

      addDoc(computersRef, {
          company: computer.company,
          materialIndex: computer.materialIndex,
          model: computer.model,
          serialNumber: computer.serialNumber
      })
          .then(() => {
              setComputers(computers => [...computers, computer])
          })
  }

  function updateComputer(id, computer) {
    // API.updateCar(id, car)
    //   .then(updatedCar => setCars(cars => cars.map(car => car.id === id ? updatedCar : car)));
  }

  function deleteComputer(id) {
      const computerRef = doc(db, 'computers', id)

      deleteDoc(computerRef)
          .then(() => {
              console.log("Usunięto");
          })
  }

  // if (cars.length === 0) return null;

  return (
    <div>
      <ul>
        {computers.map(computer => (
          <li key={computer.id}>
            <Computer computer={computer} onUpdate={updateComputer} onDelete={deleteComputer} />
          </li>
        ))}
      </ul>
      <div>
        <AddComputer onSubmit={addComputer} />
      </div>
    </div>
  );
}
