import React from "react";
import NavbarApp from "./components/NavbarApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState} from "react";
import Login from "./components/Login";

function App() {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  });

  return (
      <>
        {isSubmitted ? <NavbarApp/>  : <Login/>}
      </>
  );
}

export default App;
