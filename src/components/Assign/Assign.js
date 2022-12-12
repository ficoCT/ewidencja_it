import * as React from 'react';
import {useState} from "react";
import LoadingData from "../LoadingData";

export default function Assign({users, assign, computerId, refresh}) {

    const [userId, setUserId] = useState(users[0].id);

    const handleChange = (value) => {
        setUserId(value);
    };

    function handleAssign(event) {
        event.preventDefault();
        assign({userId: userId, computerId: computerId});
        if (typeof refresh !== 'function') return;
        refresh();
    }

  return (
          <form onSubmit={handleAssign}>
          <select
              id="users"
              name="users"
              className="form-select"
              onChange={(e) => {handleChange(e.target.value)}}
          >
              {users.length === 0 ?
                  <LoadingData/>
                  :
                  users.map(({id, username}) => {
                      return (
                          <option key={id} value={id}>
                              {username}
                          </option>
                      );
                  })
              }
          </select>
          <button type="submit" onClick={handleAssign}>Potwierdź</button>
          </form>
  );
}