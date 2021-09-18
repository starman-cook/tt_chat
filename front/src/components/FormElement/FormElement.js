import React from "react";
import './FormElement.css';

const FormElement = ({
                         name,
                         required,
                         label,
                         type,
                         value,
                         onChange,
                         placeholder,
                         error,
                         min
                     }) => {
    return (
        <label className="FormElement__label">
            {label}
            <input
                className={error ? "FormElement FormElement__error" : "FormElement"}
                autoComplete={name}
                name={name}
                type={type}
                required={required}
                id={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                min={min}
            />
            <span className="FormElement__error_message" >{error}</span>
        </label>
    );
};

export default FormElement;
