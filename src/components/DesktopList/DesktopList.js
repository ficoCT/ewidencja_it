import * as React from 'react';

export default function DesktopList({desktops}) {
  return (
      <ul>
        {desktops.map(desktop => (
            <li key={desktop.id}>
              {desktop.id} {' '} {desktop.company} {' '} {desktop.model} {' '} {desktop.inventoryNumber}
            </li>
        ))}
      </ul>
  );
}