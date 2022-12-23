import React, { useState } from 'react';
import EditComputer from '../EditComputer';
import ViewComputer from '../ViewComputer';
import Print from "../Print";
import Assign from "../Assign";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

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

    function refresh() {
        setAssignUser(false);
        setIsEditing(false);
        setPrinting(false);
    }

    let computerComponent;

    if (isEditing) {

        computerComponent = <EditComputer companiesData={companiesData} modelsData={modelsData} users={users} computer={computer} onSubmit={handleUpdate} />;

    } else if (printing){

        computerComponent = <Print computer={computer} refresh={refresh}/>

    } else if (assignUser){

        computerComponent =
            <Alert key={computer.id} variant='primary'>
                <ViewComputer computer={computer} />
                <div className="buttons">
                    <Button variant="warning" size="sm" className="me-1" onClick={handleEditButtonClick}>Edytuj</Button>
                    <Button variant="danger" size="sm" className="me-1" onClick={handleDeleteButtonClick}>Usuń</Button>
                    <Button variant="info" size="sm" className="me-1" onClick={handlePrintingButtonClick}>Podgląd formularza</Button>
                    <Assign computerId={computer.id} users={users} assign={assign} refresh={refresh}/>
                </div>
            </Alert>

    } else {

        computerComponent =
        <Alert key={computer.id} variant='primary'>
            <ViewComputer computer={computer} />
            <div className="buttons">
                <Button variant="warning" size="sm" className="me-1" onClick={handleEditButtonClick}>Edytuj</Button>
                <Button variant="danger" size="sm" className="me-1" onClick={handleDeleteButtonClick}>Usuń</Button>
                <Button variant="info" size="sm" className="me-1" onClick={handlePrintingButtonClick}>Podgląd formularza</Button>
                <Button variant="success" size="sm" className="me-1" onClick={assignUserToComputer}>Przypisz użytkownika</Button>
            </div>
        </Alert>

    }

    return (
        <div>
            {computerComponent}
        </div>
    );
}
