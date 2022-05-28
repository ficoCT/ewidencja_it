import * as React from 'react';
import EditComputer from "../EditComputer";
import ViewComputer from "../ViewComputer";

export default function Computer({computer}) {

    function handleUpdate(editedCar) {

    }

  return (
        <>
          {/*<EditComputer computer={computer} onSubmit={handleUpdate}/>*/}
          <ViewComputer computer={computer}/>
        </>
  );
}