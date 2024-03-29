import * as React from 'react';
import { useState, useEffect } from "react";
import { app } from "../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { Scheduler } from "@aldabil/react-scheduler";
import Container from 'react-bootstrap/Container';
import LoadingData from "../LoadingData";

export default function App() {

    const [events, setEvents] = useState([]);
    const db = getFirestore(app);
    const schedulerRef = collection(db, 'scheduler');

    async function loadEvents(schedulerRef) {

        let eventsData = [];
        await getDocs(schedulerRef).then(snapshot => {
            snapshot.docs.forEach(doc => {
                eventsData.push({ ...doc.data(), id: doc.id })
            })
        })
        eventsData.forEach(event => {
            event.event_id = event.id;
            event.start = event.start.toDate();
            event.end = event.end.toDate();
        });

        return eventsData;

    }

    async function reloadEvents(schedulerRef) {

        let eventsData = [];
        await getDocs(schedulerRef).then(snapshot => {
            snapshot.docs.forEach(doc => {
                eventsData.push({ ...doc.data(), id: doc.id })
            })
        })
        eventsData.forEach(event => {
            const schedulerRefUpdate = doc(db, 'scheduler', event.id);
            updateDoc(schedulerRefUpdate, {
                event_id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
            })
        });

        return eventsData;

    }

    useEffect(() => {

        loadEvents(schedulerRef)
            .then( eventsData => setEvents(eventsData));

    }, []);

    const handleConfirm = async (event, action) => {

        if (action === "edit") {
            const schedulerRefUpdate = doc(db, 'scheduler', event.event_id);
            updateDoc(schedulerRefUpdate, {
                title: event.title,
                start: event.start,
                end: event.end,
            }).then(() => {
                loadEvents(schedulerRef)
                    .then( eventsData => setEvents(eventsData));
            })
        } else if (action === "create") {
            addDoc(schedulerRef, {
                event_id: '',
                title: event.title,
                start: event.start,
                end: event.end,
            })

            reloadEvents(schedulerRef).then(() => {
                loadEvents(schedulerRef)
                    .then( eventsData => setEvents(eventsData));
            })
        }

        return {
            ...event,
            event_id: event.id
        };

    };

    const handleDelete = async (deletedId) => {

        const computerRef = doc(db, 'scheduler', deletedId)
        await deleteDoc(computerRef);

        return deletedId;
    };

  return (
      <Container className="contents">

      {events.length === 0 ?
              <LoadingData/>
              :
              <Scheduler
                  style={{ color: 'red' }}
                  events={events}
                  onConfirm={handleConfirm}
                  onDelete={handleDelete}
              />
      }

      </Container>
  );
}