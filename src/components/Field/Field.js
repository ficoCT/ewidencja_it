import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export default function Field({ label, name, type, value, errorMessage, onChange }) {
  function handleChange(event) {
    if (typeof onChange !== 'function') return;
    onChange(event);
  }

  return (
    <Form.Group className="mb-3" style={{textAlign: "left"}} controlId={label}>
      <Form.Label>{label}</Form.Label>
      {errorMessage && <Alert variant="danger">{' '}{errorMessage}</Alert>}
      <Form.Control
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </Form.Group>
  );
}
