import * as React from 'react';
import Container from 'react-bootstrap/Container';
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import Alert from "react-bootstrap/Alert";
import {useState} from "react";
import {useEffect} from "react";
import {app} from "../../firebase";
import ViewComputer from "../ViewComputer";

export default function Repairs() {

    const [queryComputer, setQueryComputer] = useState([]);
    const db = getFirestore(app);
    const computersRef = collection(db, 'computers');

    async function loadComputers(q) {

        let computersData = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            computersData.push({ ...doc.data(), id: doc.id });
        });
        return computersData;
    }

    function queryRepairs() {

        const q = query(computersRef, where("repair", "==", true));
        loadComputers(q).then(qC => setQueryComputer(qC));

    }

    useEffect(() => {

        queryRepairs();

    }, []);

  return (
      <Container className="contents">
          <Alert variant="primary">
              <span style={{fontSize: "1.3rem"}}>KOMPUTERY DO NAPRAWY</span>
          </Alert>
          {queryComputer.length === 0 ?
              ''
              :
              <>
                  {queryComputer.map(computer => (
                      <Alert key={computer.id} variant='danger'>
                          <ViewComputer computer={computer} />
                      </Alert>
                  ))}
              </>
          }
      </Container>
  );
}