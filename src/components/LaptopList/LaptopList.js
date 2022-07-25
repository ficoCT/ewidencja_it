import * as React from 'react';

export default function LaptopList({laptops}) {
  return (
      <ul>
        {laptops.map(laptop => (
            <li key={laptop.id}>
              {laptop.id} {' '} {laptop.company} {' '} {laptop.model} {' '} {laptop.inventoryNumber}
            </li>
        ))}
      </ul>
  );
}