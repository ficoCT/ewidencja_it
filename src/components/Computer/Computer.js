import React, { useState } from 'react';
import EditComputer from '../EditComputer';
import ViewComputer from '../ViewComputer';

export default function Computer({ computer, onUpdate, onDelete }) {
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
                        <EditComputer computer={computer} onSubmit={handleUpdate} />
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
