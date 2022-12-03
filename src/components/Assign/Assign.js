import * as React from 'react';
import {useState} from "react";

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
              class="form-select"
              onChange={(e) => {handleChange(e.target.value)}}
          >
              {users.length === 0 ?
                  'Ładuje się ...'
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