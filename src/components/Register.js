import {useState} from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import Field from "./Field";
import {validateRegister} from "../validateRegister";
import NavbarAdmin from "./NavbarApp";

function Register() {
    const [values, setValues] = useState({email: "", password: "", password1: ""});
    const [errorMessages, setErrorMessages] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessages(validateRegister(values));

        if (errorMessages) return;

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div>
              <span>
            Załóż konto
              </span>
              <div>
            <Field
                label="Email"
                name="email"
                type="email"
                value={values.email}
                errorMessage={errorMessages?.email}
                onChange={handleChange}
            />
            <Field
                label="Hasło"
                name="password"
                type="password"
                value={values.password}
                errorMessage={errorMessages?.password}
                onChange={handleChange}
            />
            <Field
                label="Powtórz hasło"
                name="password1"
                type="password"
                value={values.password1}
                errorMessage={errorMessages?.password1}
                onChange={handleChange}
            />

            </div>
            <button
                onClick={handleSubmit}
            >
                Załóż konto
            </button>
        </div>
    );
}

export default Register;

