import React from 'react';

export function Input({ label, name, placeholder, type, value, errorMessage, onChange }) {
    function handleChange(event) {
        if (typeof onChange === 'function') {
            onChange(event);
        }
    }

    return (
        <label>
            {label}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
            {errorMessage &&
            <span>
                {errorMessage}
            </span>}
        </label>
    );
}
