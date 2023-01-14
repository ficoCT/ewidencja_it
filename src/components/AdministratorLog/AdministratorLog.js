import * as React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { app } from "../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, serverTimestamp } from "firebase/firestore";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Field from "../Field";
import Note from "../Note";
import LoadingData from "../LoadingData";

export default function AdministratorLog() {console.log('al');

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
      createdAt: serverTimestamp()
    })
        .then(() => {
          loadLog(logRef).then(logData => setLog(logData));
        })

  }

  function deleteNote(id) {

    const noteRef = doc(db, 'administratorLog', id)
    deleteDoc(noteRef)
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

  function sortDate (a, b) {

    return b.createdAt - a.createdAt;

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
          <LoadingData/>
           :
          <>
            {log.sort(sortDate).map(note => (
              <Note
                key={note.id}
                note={note}
                onDelete={deleteNote}
              />
            ))}
          </>
      }
      </Container>
  );

}