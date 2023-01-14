import * as React from 'react';
import Computer from "../Computer";

export default function ComputerList({computers}) {
  return (
      <ul>
          {computers.map(computer => (
              <li key={computer.id}>
                  <Computer computer={computer} />
              </li>
          ))}
      </ul>
  );
}