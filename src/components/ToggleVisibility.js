import {useState} from "react";
import Button from 'react-bootstrap/Button';

export default function ToggleVisibility({ children }) {

    const [show, setShow] = useState();

    function toggleShow() {
        setShow(!show);
    }

    let buttonText = show ? "Ukryj" : "Pokaż";

    return (
        <div>
            {show && children}
            <Button className="mt-2 mb-4" variant="primary" onClick={toggleShow}>{buttonText}</Button>
        </div>
    );
}