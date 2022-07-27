import React, { useEffect, useState } from 'react';
import {collection, doc, getDocs, getFirestore, setDoc} from "firebase/firestore";
import Computer from '../Computer';
import AddComputer from '../AddComputer';
import {app} from "../../firebase";
// import * as API from '../../api/cars';

export default function ComputersManagerAdmin() {
    // const [computers, setComputers] = useState([
    //     {id: 1, company:'company A', model:'Desktop 1', inventoryNumber: "1D", serialNumber: "ASX23TD" },
    //     {id: 2, company:'company B', model:'Desktop 2', inventoryNumber: "2D", serialNumber: "ASX23TD" },
    //     {id: 1, company:'company A', model:'Laptop 1', inventoryNumber: "1L", serialNumber: "ASX23TD" },
    //     {id: 2, company:'company B', model:'Laptop 2', inventoryNumber: "2L", serialNumber: "ASX23TD" }
    // ]);
    const [computers, setComputers] = useState([]);
    const db = getFirestore(app);

    async function getComputers(db) {
        const computers = collection(db, 'computers');
        const computersSnapshot = await getDocs(computers);
        const computersData = computersSnapshot.docs.map(doc => doc.data());
        return computersData;
    }

  useEffect(() => {
      getComputers(db).then(computersData => setComputers(computersData));
      console.log("computers", computers);
  }, []);

  // function loadCars() {
  //   API.getCars()
  //     .then(setCars);
  // }

  function addComputer(computer) {
    // API.createCar(car)
    //   .then(car => setCars(cars => [...cars, car]));
  }

  function updateComputer(id, computer) {
    // API.updateCar(id, car)
    //   .then(updatedCar => setCars(cars => cars.map(car => car.id === id ? updatedCar : car)));
  }

  function deleteComputer(id) {
    // API.deleteCar(id)
    //   .then(() => setCars(cars => cars.filter(car => car.id !== id)));
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
