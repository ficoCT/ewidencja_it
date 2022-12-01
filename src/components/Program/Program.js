import React, { useState } from 'react';
import EditComputer from '../EditComputer';
import ViewComputer from '../ViewComputer';
import Print from "../Print";
import Assign from "../Assign";

//export default function Program({companiesData, modelsData, program, users, onUpdate, onDelete, assign}) {
export default function Program({program}) {

    // const [isEditing, setIsEditing] = useState(false);
    // const [printing, setPrinting] = useState(false);
    // const [assignUser, setAssignUser] = useState(false);
    //
    // function handleEditButtonClick() {
    //     setIsEditing(true);
    // }
    //
    // function handleUpdate(editedComputer) {
    //     if (typeof onUpdate !== 'function') return;
    //     setIsEditing(false);
    //     onUpdate(computer.id, editedComputer);
    // }
    //
    // function handleDeleteButtonClick() {
    //     if (typeof onDelete !== 'function') return;
    //     onDelete(computer.id);
    // }
    //
    // function handlePrintingButtonClick() {
    //     setIsEditing(false);
    //     setPrinting(true);
    // }
    //
    // function assignUserToComputer() {
    //     setAssignUser(true);
    //     setIsEditing(false);
    //     setPrinting(false);
    // }
    //
    // function refresh() {
    //     setAssignUser(false);
    //     setIsEditing(false);
    //     setPrinting(false);
    // }
    //
        let programComponent;
    //
    // if (isEditing) {
    //
    //     computerComponent = <EditComputer companiesData={companiesData} modelsData={modelsData} computer={computer} onSubmit={handleUpdate} />;
    //
    // } else if (printing){
    //
    //     computerComponent = <Print computer={computer} refresh={refresh}/>
    //
    // } else if (assignUser){
    //
    //     computerComponent =
    //     <>
    //         <div><ViewProgram computer={computer} /></div>
    //         <button onClick={handleEditButtonClick}>Edytuj</button>
    //         <button onClick={handleDeleteButtonClick}>Usuń</button>
    //         <button onClick={handlePrintingButtonClick}>Podgląd formularza</button>
    //         <Assign computerId={computer.id} users={users} assign={assign} refresh={refresh}/>
    //     </>
    //
    // } else {
    {
            programComponent =
        <>
            <div><ViewProgram program={program} /></div>
    {/*//         <button onClick={handleEditButtonClick}>Edytuj</button>*/}
    {/*//         <button onClick={handleDeleteButtonClick}>Usuń</button>*/}
    {/*//         <button onClick={handlePrintingButtonClick}>Podgląd formularza</button>*/}
    {/*//         <button onClick={assignUserToComputer}>Przypisz użytkownika</button>*/}
        </>

    }

    return (
        <div>
            {programComponent}
        </div>
    );
}