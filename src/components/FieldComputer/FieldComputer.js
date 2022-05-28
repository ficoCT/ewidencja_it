import * as React from 'react';

export default function FieldComputer({ label, name, type, value, errorMessage, onChange }) {

  function handleChange(event) {
    if (typeof onChange !== 'function') return;
    onChange(event);
  }

  return (
      <label>
        {label}:
        {errorMessage && <span>{errorMessage}</span>}
        <input
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
        />
      </label>
  );
}