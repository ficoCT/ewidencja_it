import React, { useState } from 'react';
import LaptopList from "../LaptopList";
import DesktopList from "../DesktopList";
import ComputerList from "../ComputersList";

export default function ComputersManagerUser() {

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

  return (
    <>
        WSZYSTKIE KOMPUTERY - PANEL UŻYTKOWNIK
        <br />
        <br />
        WSZYSTKIE KOMPUTERY - MODELE
        <ComputerList computers={computers}/>
        KOMPUTERY TYPU DESKTOP
        <DesktopList desktops={desktops}/>
        KOMPUTERY TYPU LAPTOP
        <LaptopList laptops={laptops}/>
    </>
  );
}