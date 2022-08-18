import React, { useState } from 'react';
import ViewUser from "../ViewUser";

export default function User({ user, onUpdate, onDelete }) {

    function handleDeleteButtonClick() {
        if (typeof onDelete !== 'function') return;
        onDelete(user.id);
    }

    return (
                    <>
                        <div><ViewUser user={user} /></div>
                        <button onClick={handleDeleteButtonClick}>Usuń</button>
                    </>
    );
}
