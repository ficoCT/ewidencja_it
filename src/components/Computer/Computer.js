import React, { useState } from 'react';
import EditComputer from '../EditComputer';
import ViewComputer from '../ViewComputer';
import Print from "../Print";
import Assign from "../Assign";

export default function Computer({companiesData, modelsData, computer, users, onUpdate, onDelete, assign}) {

    const [isEditing, setIsEditing] = useState(false);
    const [printing, setPrinting] = useState(false);
    const [assignUser, setAssignUser] = useState(false);

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

    function assignUserToComputer() {
        setAssignUser(true);
        setIsEditing(false);
        setPrinting(false);
    }

    let computerComponent;

    if (isEditing) {

        computerComponent = <EditComputer companiesData={companiesData} modelsData={modelsData} computer={computer} onSubmit={handleUpdate} />;

    } else if (printing){

        computerComponent = <Print computer={computer}/>

    } else if (assignUser){

        computerComponent = <Assign computerId={computer.id} users={users} assign={assign}/>

    } else {

        computerComponent =
        <>
            <div><ViewComputer computer={computer} /></div>
            <button onClick={handleEditButtonClick}>Edytuj</button>
            <button onClick={handleDeleteButtonClick}>Usuń</button>
            <button onClick={handlePrintingButtonClick}>Podgląd formularza</button>
            <button onClick={assignUserToComputer}>Przypisz użytkownika</button>
        </>

    }

    return (
        <div>
            {computerComponent}
        </div>
    );
}
