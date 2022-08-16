// import { ReactComponent as SVGDecoration } from "../../../Nowy folder/uselessThings/src/assets/Decoration.svg";
// import { Input } from "../../../Nowy folder/uselessThings/src/components/Input";
// import { Link } from "react-router-dom";
// import Links from "../../../Nowy folder/uselessThings/src/components/Links";
// import { validateLogin } from '../../../Nowy folder/uselessThings/src/validateLogin';
// import {useState} from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  // const [values, setValues] = useState({email: "", password: ""});
  // const [errorMessages, setErrorMessages] = useState(null);
  //
  // function handleMouseOver(e) {
  //     e.target.style.border = "2px solid #737373";
  //     e.target.style.cursor = "pointer";
  // }
  //
  // function handleMouseOut(e) {
  //     e.target.style.border = "2px solid transparent";
  // }
  //
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //
  //     setErrorMessages(validateLogin(values));
  //
  //     if (errorMessages) return;
  //
  //     const auth = getAuth();
  //     signInWithEmailAndPassword(auth, values.email, values.password)
  //         .then((userCredential) => {
  //             // Signed in
  //             const user = userCredential.user;
  //         })
  //         .catch((error) => {
  //             const errorCode = error.code;
  //             const errorMessage = error.message;
  //         });
  // };
  //
  // const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setValues(prevValues => ({
  //         ...prevValues,
  //         [name]: value,
  //     }));
  // };

  return (
    <div className="login container">
      {/*<div className="login__navbar" >*/}
      {/*    <Links />*/}
      {/*</div>*/}
      {/*<span className="login__title">*/}
      {/*    Zaloguj się*/}
      {/*</span>*/}
      {/*<SVGDecoration className="homeTextSVGDecoration"/>*/}
      {/*<div className="login__input">*/}
      {/*    <Input*/}
      {/*        label="Email"*/}
      {/*        name="email"*/}
      {/*        type="email"*/}
      {/*        value={values.email}*/}
      {/*        errorMessage={errorMessages?.email}*/}
      {/*        onChange={handleChange}*/}
      {/*    />*/}
      {/*    <Input*/}
      {/*        label="Hasło"*/}
      {/*        name="password"*/}
      {/*        type="password"*/}
      {/*        value={values.password}*/}
      {/*        errorMessage={errorMessages?.password}*/}
      {/*        onChange={handleChange}*/}
      {/*    />*/}
      {/*</div>*/}
      {/*<div className="login__account">*/}
      {/*    <Link*/}
      {/*        className="login__account__register" to="/register"*/}
      {/*        onMouseOver={handleMouseOver}*/}
      {/*        onMouseOut={handleMouseOut}*/}
      {/*    >*/}
      {/*            Załóż konto*/}
      {/*    </Link>*/}
      {/*    <div*/}
      {/*        className="login__account__login"*/}
      {/*        onMouseOver={handleMouseOver}*/}
      {/*        onMouseOut={handleMouseOut}*/}
      {/*        onClick={handleSubmit}*/}
      {/*    >*/}
      {/*        Zaloguj się*/}
      {/*    </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default Login;
