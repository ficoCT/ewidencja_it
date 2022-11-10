import * as React from 'react';
import Container from 'react-bootstrap/Container';
import {useState} from "react";

export default function Assign({users, assign, computerId}) {

    const [userId, setUserId] = useState(users[0].id);

    const handleChange = (value) => {
        setUserId(value);
    };

    function handleAssign() {
        assign({userId: userId, computerId: computerId});
    }

  return (
      <Container>
          <select
              id="users"
              name="users"
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
          <button onClick={handleAssign}>Potwierdź</button>
      </Container>
  );
}