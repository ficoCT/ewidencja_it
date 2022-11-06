import React, { useState } from 'react';
import EditComputer from '../EditComputer';
import ViewComputer from '../ViewComputer';
import Print from "../Print";

export default function Computer({companiesData, modelsData, computer, onUpdate, onDelete }) {

    const [isEditing, setIsEditing] = useState(false);
    const [printing, setPrinting] = useState(false);

    function handleEditButtonClick() {
        setIsEditing(true);
    }

    function handleUpdate(editedComputer) {
        if (typeof onUpdate !== 'function') return;
        setIsEditing(false);
        onUpdate(computer.id, editedComputer);
    }

    function handleDeleteButtonClick() {
        if (typeof onDelete !== 'function') return;
        onDelete(computer.id);
    }

    function handlePrintingButtonClick() {
        setIsEditing(false);
        setPrinting(true);
    }

    let computerComponent;

    if (isEditing) {

        computerComponent = <EditComputer companiesData={companiesData} modelsData={modelsData} computer={computer} onSubmit={handleUpdate} />;

    } else if (printing){

        computerComponent = <Print computer={computer}/>

    } else {

        computerComponent =
        <>
            <div><ViewComputer computer={computer} /></div>
            <button onClick={handleEditButtonClick}>Edytuj</button>
            <button onClick={handleDeleteButtonClick}>Usuń</button>
            <button onClick={handlePrintingButtonClick}>Podgląd formularza</button>
        </>

    }

    return (
        <div>
            {computerComponent}
        </div>
    );
}
