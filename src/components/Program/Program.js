import React from 'react';
import ViewProgram from "../ViewProgram";
import Alert from "react-bootstrap/Alert";

export default function Program({ program }) {

        let programComponent;

    {
            programComponent =
        <Alert key={program.id} variant='primary'>
            <div><ViewProgram program={program} /></div>
        </Alert>
    }

    return (
        <div>
            {programComponent}
        </div>
    );
}
