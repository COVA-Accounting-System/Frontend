import React from "react";
import "./Input.scss";

const Input = ({ id, label, name, type, style, value, onChange }) => {
  return (
    <div className="input-element-container">
      <input
        id={id}
        name={name}
        className={`input-element-${style}`}
        type={type}
        spellCheck="false"
        // value={value}
        onChange={onChange}
        required
      />
      <span className={`label-element-${style}`}>{label}</span>
    </div>
  );
};

export default Input;
