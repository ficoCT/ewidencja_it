import {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {validateLogin} from "../validateLogin";
import {AuthContext} from "../context/AuthContext";
import Field from "./Field";
import React from "react";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";

function Login() {
  const [values, setValues] = useState({email: "", password: ""});
  const [errorMessages, setErrorMessages] = useState(null);

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext) ;

  const handleSubmit = (e) => {
      e.preventDefault();
      setErrorMessages(validateLogin(values));

      if (errorMessages) return;

      const auth = getAuth();
      signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
              const user = userCredential.user;
              dispatch({type:"LOGIN", payload:user})
              navigate("/home");
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
    <Container>
        <div className='mt-5'>
          <Field
              label="Email"
              name="email"
              type="email"
              value={values.email}
              errorMessage={errorMessages?.email}
              onChange={handleChange}
              className='mt-5'
          />
          <Field
              label="Hasło"
              name="password"
              type="password"
              value={values.password}
              errorMessage={errorMessages?.password}
              onChange={handleChange}
          />
          <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
          >
              Zaloguj się
          </Button>
        </div>
    </Container>
  );
}

export default Login;
