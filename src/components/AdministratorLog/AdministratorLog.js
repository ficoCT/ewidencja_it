import * as React from 'react';
import Field from "../Field";
import {useState} from "react";
import {addDoc, collection, getDocs, getFirestore} from "firebase/firestore";
import {app} from "../../firebase";
import {useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function AdministratorLog() {

  const [values, setValues] = useState({title: '', note: ''});
  const [log, setLog] = useState([]);

  const db = getFirestore(app);
  const logRef = collection(db, 'administratorLog');

  const handleChange = (name, value) => {

    setValues((values) => {
      return { ...values, [name]: value };
    });

  };

  async function loadLog(logRef) {

    let logData = [];

    await getDocs(logRef).then(snapshot => {
      snapshot.docs.forEach(doc => {
        logData.push({ ...doc.data(), id: doc.id });
      })
    })

    return logData;

  }

  function addNote() {

    addDoc(logRef, {
      title: values.title,
      note: values.note,
    })
        .then(() => {
          loadLog(logRef).then(logData => setLog(logData));
        })
  }

  useEffect(() => {

    loadLog(logRef).then(logData => setLog(logData));

  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    addNote();
    setValues({title: '', note: ''});
  }

  return (
      <Container className="contents">
      <Form onSubmit={handleSubmit}>
        <br />
        <br />
        <Field
            label="Tytuł"
            name="title"
            type="text"
            value={values.title}
            onChange={(e) => handleChange("title", e.target.value)}
        />
        <Field
            label="Notatka"
            name="note"
            type="textarea"
            value={values.note}
            onChange={(e) => handleChange("note", e.target.value)}
        />
        <Button variant="primary" type="submit">
          ZAPISZ
        </Button>
      </Form>

      <br/>
      <br/>
      {log.length === 0 ?
           <h1>Ładowanie danych ...</h1>
           :
          <>
            {log.map(note => (
                  <Alert key={note.id} variant='primary'>
                    {note.title} {'-'} {note.note}
                  </Alert>
            ))}
          </>
      }
      </Container>
  );

}