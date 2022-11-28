import React, { useState } from 'react';
import ViewUser from "../ViewUser";
import Button from 'react-bootstrap/Button';

export default function User({ user, onUpdate, onDelete }) {

    function handleDeleteButtonClick() {
        if (typeof onDelete !== 'function') return;
        onDelete(user.id);
    }

    return (
                    <div className="user">
                        <ViewUser user={user} />
                        <Button variant="danger" onClick={handleDeleteButtonClick} className='mx-4'>Usuń</Button>
                    </div>
    );
}
