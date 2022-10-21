import React from "react";
import "./Input.scss";

const Input = ({ label, type, style, value, onChange }) => {
  return (
    <div className="input-element-container">
      <input
        className={`input-element-${style}`}
        type={type}
        spellCheck="false"
        value={value}
        onChange={onChange}
        required
      />
      <span className="label-element">{label}</span>
    </div>
  );
};

export default Input;
