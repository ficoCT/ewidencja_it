import React, { useState } from 'react';
import EditComputer from '../EditComputer';
import ViewComputer from '../ViewComputer';

export default function Computer({companiesData, modelsData, computer, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);

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

    return (
        <div>
            {isEditing
                ? (
                    <div>
                        <EditComputer companiesData={companiesData} modelsData={modelsData} computer={computer} onSubmit={handleUpdate} />
                    </div>
                )
                : (
                    <>
                        <div><ViewComputer computer={computer} /></div>
                        <button onClick={handleEditButtonClick}>Edytuj</button>
                        <button onClick={handleDeleteButtonClick}>Usuń</button>
                    </>
                )}
        </div>
    );
}
