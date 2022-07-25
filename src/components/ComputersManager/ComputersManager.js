import React, { useEffect, useState } from 'react';
import Computer from "../Computer";
import AddComputer from "../AddComputer";
import {collection, getDocs, getFirestore, setDoc} from "firebase/firestore";
import {app} from "../../firebase";
import LaptopList from "../LaptopList";
import DesktopList from "../DesktopList";
import ComputerList from "../ComputersList";

export default function ComputersManager() {

  const [computers, setComputers] = useState([
      {id: 1, company:'company A', model:'Desktop 1', inventoryNumber: "1D", serialNumber: "ASX23TD" },
      {id: 2, company:'company B', model:'Desktop 2', inventoryNumber: "2D", serialNumber: "ASX23TD" },
      {id: 1, company:'company A', model:'Laptop 1', inventoryNumber: "1L", serialNumber: "ASX23TD" },
      {id: 2, company:'company B', model:'Laptop 2', inventoryNumber: "2L", serialNumber: "ASX23TD" }
  ]);
  const [desktops, setDesktops] = useState([
      {id: 1, company:'company A', model:'Desktop 1', inventoryNumber: "1D" },
      {id: 2, company:'company B', model:'Desktop 2', inventoryNumber: "2D" }
  ]);
  const [laptops, setLaptops] = useState([
      {id: 1, company:'company A', model:'Laptop 1', inventoryNumber: "1L" },
      {id: 2, company:'company B', model:'Laptop 2', inventoryNumber: "2L" }
  ]);

  const db = getFirestore(app);

    async function loadComputers() {
        const computers = collection(db, 'desktop');
        const computersSnapshot = await getDocs(computers);
        const allComputers = computersSnapshot.docs.map(doc => doc.data());
        return allComputers;
    }

    // useEffect(() => {
    //     loadComputers().then(desktop => setDesktop(desktop));;
    // }, []);

    function addComputer(computer) {

    }

    function updateComputer(id, computer) {

    }

    function deleteComputer(id) {

    }

  return (
    <>
        WSZYSTKIE KOMPUTERY
        <ComputerList computers={computers}/>
        {/*<AddComputer onSubmit={addComputer} />*/}
        KOMPUTERY TYPU DESKTOP
        <DesktopList desktops={desktops}/>
        KOMPUTERY TYPU LAPTOP
        <LaptopList laptops={laptops}/>
    </>
  );
}