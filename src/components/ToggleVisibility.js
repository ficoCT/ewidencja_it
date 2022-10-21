import {useState} from "react";

export default function ToggleVisibility({ children }) {

    const [show, setShow] = useState();

    function toggleShow() {
        setShow(!show);
    }

    let buttonText = show ? "Ukryj" : "Pokaż";

    return (
        <div>
            {show && children}
            <button onClick={toggleShow}>{buttonText}</button>
        </div>
    );
}