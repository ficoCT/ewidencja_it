import {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Links from "./Links";
import {Input} from "./Input";
import {validateLogin} from "../validateLogin";
import {AuthContext} from "../context/AuthContext";

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
