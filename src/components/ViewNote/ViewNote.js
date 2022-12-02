import * as React from 'react';

export default function ViewNote({ note: { title, note } }) {
  return (
      <>
        <strong> {title} </strong> {' '} {note}
      </>
  );
}