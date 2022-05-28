import * as React from 'react';

export default function ViewComputer({ computer: { id, name, company} }) {
  return (
      <>
        <strong>{id}{' '}{name}</strong> {company}
      </>
  );
}