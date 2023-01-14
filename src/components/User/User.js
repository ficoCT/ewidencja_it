import React from 'react';
import Button from 'react-bootstrap/Button';
import ViewUser from "../ViewUser";

export default function User({ user, onDelete }) {

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
