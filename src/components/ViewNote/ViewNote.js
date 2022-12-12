import * as React from 'react';
import {useEffect, useState} from "react";
import {deleteDoc, doc} from "firebase/firestore";

export default function ViewNote({ note: { title, note, createdAt} }) {

    let nowDate = new Date(2018).toDateString()
    const [date, setDate] = useState(nowDate);

    function dateCreatedAt() {

        const d = createdAt.toDate().toDateString();
        setDate(d);

    }

    useEffect(() => {

        dateCreatedAt();

    }, []);

  return (
      <div className="note">
        <div>
            <strong> {title} </strong> {' '} {note}
        </div>
        <div style={{fontSize: "0.8rem"}}>
            {date}
        </div>
      </div>
  );
}