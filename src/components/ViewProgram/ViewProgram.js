import * as React from 'react';

export default function ViewProgram({ program: { name, company, key} }) {
  return (
      <>
        <strong> {name} </strong> {' '} {company} {' '} {key}
      </>
  );
}