import {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Links from "./Links";
import {Input} from "./Input";
import {validateLogin} from "../validateLogin";

function Login() {
  const [values, setValues] = useState({email: "", password: ""});
  const [errorMessages, setErrorMessages] = useState(null);

  const handleSubmit = (e) => {
      e.preventDefault();
    console.log('handleSubmit');
      setErrorMessages(validateLogin(values));

      if (errorMessages) return;

      const auth = getAuth();
      signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
              const user = userCredential.user;
              console.log('user', user.email);
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log('errorMessage', errorMessage);
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
      <div>
          <Links />
      </div>
      <span>
          Zaloguj się
      </span>
      <div>
          <Input
              label="Email"
              name="email"
              type="email"
              value={values.email}
              errorMessage={errorMessages?.email}
              onChange={handleChange}
          />
          <Input
              label="Hasło"
              name="password"
              type="password"
              value={values.password}
              errorMessage={errorMessages?.password}
              onChange={handleChange}
          />
      </div>
      <div>
          <button

              onClick={handleSubmit}
          >
              Zaloguj się
          </button>
      </div>
    </div>
  );
}

export default Login;
