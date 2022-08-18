import * as React from 'react';

export default function ViewUser({ user: { id, displayName, username, email, phone, department, address, password} }) {
  return (
      <>
        <strong> {displayName} {' ID: '} {id} </strong> {' '} {department} {' '} {username} {' '} {email} {' '} {phone} {' '} {address} {' '} {password}
      </>
  );
}