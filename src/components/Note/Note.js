import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ViewNote from "../ViewNote";

export default function Note({note, onDelete}) {

    function deleteNote() {

        if (typeof onDelete !== 'function') return;
        onDelete(note.id);

    }

        let noteComponent;
        noteComponent =
        <Alert key={note.id} variant='primary'>
            <ViewNote note={note} />
            <div className="buttons">
                <Button variant="danger" size="sm" className="me-1" onClick={deleteNote}>Usuń</Button>
            </div>
        </Alert>

    return (
        <div>
            {noteComponent}
        </div>
    );
}
