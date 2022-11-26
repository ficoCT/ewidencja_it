import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { validateLogin } from "../validateLogin";
import Field from "./Field";
import React from "react";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import {UserAuth} from "../context/AuthContext";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password)
            navigate('/home')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    };

  return (
    <Container className="contents">
        <div>
          <Field
              label="Email"
              name="email"
              type="email"
              value={email}
              // errorMessage={errorMessages?.email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-5'
          />
          <Field
              label="Hasło"
              name="password"
              type="password"
              value={password}
              // errorMessage={errorMessages?.password}
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
