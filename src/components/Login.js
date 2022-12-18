import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "./Field";
import React from "react";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container"
import {validateLogin} from './validateLogin';
import {UserAuth} from "../context/AuthContext";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessages = validateLogin({email, password});
        setErrorMessages(errorMessages);
        if (errorMessages) return;
        try {
            await signIn(email, password)
            navigate('/home')
        } catch (e) {
            setErrorMessages(e.message)
        }
    };

  return (
    <Container className="contents">
        <div style={{textAlign: "center", marginTop: "1rem"}}>
          <h1>SYSTEM GOSPODARKI SPRZĘTEM TELEINFORMATYCZNYM</h1>
          <Field
              label="Email"
              name="email"
              type="email"
              value={email}
              errorMessage={errorMessages?.email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-5'
          />
          <Field
              label="Hasło"
              name="password"
              type="password"
              value={password}
              errorMessage={errorMessages?.password}
              onChange={(e) => setPassword(e.target.value)}
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
