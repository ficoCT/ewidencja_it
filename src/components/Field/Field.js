import React from 'react';
import Form from 'react-bootstrap/Form';

export default function Field({ label, name, type, value, errorMessage, onChange }) {
  function handleChange(event) {
    if (typeof onChange !== 'function') return;
    onChange(event);
  }

    // <label>
    //     {label}:
    //     {errorMessage && <span>{' '}({errorMessage})</span>}
    //     <input
    //         name={name}
    //         type={type}
    //         value={value}
    //         onChange={handleChange}
    //     />
    // </label>

  return (
    <Form.Group className="mb-3" controlId={label}>
      <Form.Label>{label}</Form.Label>
      {errorMessage && <span>{' '}({errorMessage})</span>}
      <Form.Control
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </Form.Group>
  );
}
