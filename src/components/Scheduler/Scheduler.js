import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "./events";
import * as React from 'react';

export default function App() {

  return <Scheduler
            events={EVENTS}
            fields={[
              {
                name: "user_id",
                type: "select",
                // Should provide options with type:"select"
                options: [
                  { id: 1, text: "John", value: 1 },
                  { id: 2, text: "Mark", value: 2 }
                ],
                config: { label: "User", required: true, errMsg: "Plz Select User" }
              },
              {
                name: "Description",
                type: "input",
                default: "Default Value...",
                config: { label: "Details", multiline: true, rows: 4 }
              },
              {
                name: "anotherdate",
                type: "date",
                config: {
                  label: "Other Date",
                  md: 6,
                  modalVariant: "dialog",
                  type: "datetime"
                }
              }
            ]}
          />;

}