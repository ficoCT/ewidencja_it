import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "./events";
import * as React from 'react';
import {useState} from "react";
import {collection, getDocs, getFirestore} from "firebase/firestore";
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
        if (action === "edit") {
            /** PUT event to remote DB */
        } else if (action === "create") {
            /**POST event to remote DB */
        }
        /**
         * Make sure to return 4 mandatory fields:
         * event_id: string|number
         * title: string
         * start: Date|string
         * end: Date|string
         * ....extra other fields depend on your custom fields/editor properties
         */
        // Simulate http request: return added/edited event
        return new Promise((res, rej) => {
            setTimeout(() => {
                res({
                    ...event,
                    event_id: event.event_id || Math.random()
                });
            }, 3000);
        });
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
      {events.length === 0 ?
              'Ładuje się ...'
              :
              <Scheduler
                  events={events}
                  // remoteEvents={fetchRemote}
                  onConfirm={handleConfirm}
                  onDelete={handleDelete}
              />
      }
      </>
  );
}