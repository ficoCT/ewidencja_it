import React, { useState } from 'react';
import {collection, doc, getDoc, getDocs, getFirestore, query, where} from "firebase/firestore";
import {app} from "../../firebase";
import Container from 'react-bootstrap/Container';
import {UserAuth} from "../../context/AuthContext";
import Alert from "react-bootstrap/Alert";
import ViewComputerUser from "../ViewComputerUser";
import ViewUser from "../ViewUser";
import LoadingData from "../LoadingData";

export default function ComputersUser() {

  const [userDoc, setUserDoc] = useState({});
  const [computers, setComputers] = useState([]);

  const { user } = UserAuth();
  const db = getFirestore(app);
  const computersRef = collection(db, 'computers');

  if(typeof(user.uid)==="string") {
    let computersData = [];
    const qk = query(computersRef, where("idUser", "==", user.uid));

    getDocs(qk).then(snapshot => {
      snapshot.docs.forEach(doc => {
        computersData.push({ ...doc.data(), id: doc.id });
      })
      setComputers(computersData);
    })

    const userRef = doc(db, 'users', user.uid);
    const docSnap = getDoc(userRef).then(docSnap => {
      if (docSnap.exists()) {
        setUserDoc(docSnap.data());
      }
    })
  }

  return (
      <Container>
        <Alert variant="primary">
          <span style={{fontSize: "1.3rem"}}>DANE UŻYTKOWNIKA</span>
        </Alert>
        <div className="contents">
          {userDoc.length === 0 ?
              <LoadingData/>
              :
              <ViewUser user={userDoc} />
          }
        </div>
        <br/>
        <br/>
          <Alert variant="primary">
              <span style={{fontSize: "1.3rem"}}>LISTA KOMPUTERÓW UŻYTKOWNIKA</span>
          </Alert>
          <div className="contents">
            {computers.length === 0 ?
                <LoadingData/>
                :
                computers.map(computer => (
                  <div key={computer.id}>
                    <ViewComputerUser computer={computer} />
                  </div>
                ))
            }
          </div>
      </Container>
  );
}