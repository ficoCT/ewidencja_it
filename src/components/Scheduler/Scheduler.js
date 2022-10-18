import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "./events";
import * as React from 'react';
import {useState} from "react";
import {addDoc, collection, doc, getDocs, getFirestore, updateDoc} from "firebase/firestore";
import {app} from "../../firebase";
import {useEffect} from "react";
import Computer from "../Computer";

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
            event.start = event.start.toDate();
            event.end = event.end.toDate();
        });

        return eventsData;
    }

    useEffect(() => {
        loadEvents(schedulerRef)
            .then( eventsData => setEvents(eventsData));
    }, []);

    const handleConfirm = async (event, action) => {
        console.log(event, action);
        console.log('event.event_id', event.event_id);

        event.event_id = event.event_id || Math.random();

        if (action === "edit") {
            //const schedulerRefUpdate = doc(db, 'scheduler', String(event.event_id));
            const schedulerRefUpdate = doc(db, 'scheduler', '0.5924571511220311');
            console.log('String(event.event_id)', String(event.event_id));
            await updateDoc(schedulerRefUpdate, {
                title: event.title,
                start: event.start,
                end: event.end,
            })
        } else if (action === "create") {
            addDoc(schedulerRef, {
                event_id: event.event_id,
                title: event.title,
                start: event.start,
                end: event.end,
            })
        }
        /**
         * Make sure to return 4 mandatory fields:
         * event_id: string|number
         * title: string
         * start: Date|string
         * end: Date|string
         * ....extra other fields depend on your custom fields/editor properties
         */

        return {
            ...event,
            event_id: event.event_id || Math.random()
        };

    };

    const handleDelete = async (deletedId) => {
        // Simulate http request: return the deleted id
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(deletedId);
            }, 3000);
        });
    };

  return (
      <>
      {/*{events.length === 0 ?*/}
      {/*        'Ładuje się ...'*/}
      {/*        :*/}
      {/*        <Scheduler*/}
      {/*            events={events}*/}
      {/*            // onConfirm={handleConfirm}*/}
      {/*            // onDelete={handleDelete}*/}
      {/*        />*/}
      {/*}*/}
                  <Scheduler
                      events={events}
                      onConfirm={handleConfirm}
                      // onDelete={handleDelete}
                  />
      </>
  );
}