import * as React from 'react';

export default function ViewHardware({ hardware: { name, company, key} }) {
  return (
      <>
        <strong> {name} </strong> {' '} {company} {' '} {key}
      </>
  );
}