import React, { useEffect, useState } from 'react';
import {collection, doc, getDocs, deleteDoc,  getFirestore, setDoc} from "firebase/firestore";
import Computer from '../Computer';
import AddComputer from '../AddComputer';
import {app} from "../../firebase";
// import * as API from '../../api/cars';

export default function ComputersManagerAdmin() {

    const [computers, setComputers] = useState([]);
    const db = getFirestore(app);

    async function loadComputers(db) {
        const computersRef = collection(db, 'computers');
        const computersSnapshot = await getDocs(computersRef);
        const computersData = computersSnapshot.docs.map(doc => doc.data());
        return computersData;
    }

  useEffect(() => {
      loadComputers(db).then(computersData => setComputers(computersData));
  }, []);

  function addComputer(computer) {
    // API.createCar(car)
    //   .then(car => setCars(cars => [...cars, car]));
  }

  function updateComputer(id, computer) {
    // API.updateCar(id, car)
    //   .then(updatedCar => setCars(cars => cars.map(car => car.id === id ? updatedCar : car)));
  }

  function deleteComputer(id) {
      const computersRef = doc(db, 'computers', id)

      deleteDoc(computersRef)
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
