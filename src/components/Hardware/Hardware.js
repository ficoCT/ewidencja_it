import React from 'react';
import Alert from "react-bootstrap/Alert";
import ViewHardware from "../ViewHardware";

export default function Hardware({ hardware }) {

        let hardwareComponent;

    {
        hardwareComponent =
        <Alert key={hardware.id} variant='primary'>
            <div><ViewHardware hardware={hardware} /></div>
        </Alert>
    }

    return (
        <div>
            {hardwareComponent}
        </div>
    );
}
