import React, { useEffect, useState } from 'react';
// import Car from '../Car';
// import AddCar from '../AddCar';
// import * as API from '../../api/cars';

export default function ComputersManagerAdmin() {
  const [cars, setCars] = useState([]);

  // useEffect(() => {
  //   loadCars();
  // }, []);
  //
  // function loadCars() {
  //   API.getCars()
  //     .then(setCars);
  // }
  //
  // function addCar(car) {
  //   API.createCar(car)
  //     .then(car => setCars(cars => [...cars, car]));
  // }
  //
  // function updateCar(id, car) {
  //   API.updateCar(id, car)
  //     .then(updatedCar => setCars(cars => cars.map(car => car.id === id ? updatedCar : car)));
  // }
  //
  // function deleteCar(id) {
  //   API.deleteCar(id)
  //     .then(() => setCars(cars => cars.filter(car => car.id !== id)));
  // }
  //
  // if (cars.length === 0) return null;

  return (
    <div className="cars-manager">
      {/*<ul>*/}
      {/*  {cars.map(car => (*/}
      {/*    <li key={car.id}>*/}
      {/*      <Car car={car} onUpdate={updateCar} onDelete={deleteCar} />*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      {/*<div className="cars-manager__add">*/}
      {/*  <AddCar onSubmit={addCar} />*/}
      {/*</div>*/}
      ComputersManagerAdmin
    </div>
  );
}
