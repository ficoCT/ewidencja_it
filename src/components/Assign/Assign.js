import * as React from 'react';
import {useState} from "react";
import LoadingData from "../LoadingData";
import Button from "react-bootstrap/Button";

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
              className="form-select mt-2 mb-2"
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
          <Button variant="success"  type="submit" onClick={handleAssign}>Potwierdź</Button>
          </form>
  );
}