import React from "react";
import "./Input.scss";

const InputDate = ({ value, onInput }) => {
  return (
    <div className="input-date-container">
      <label htmlFor="date-picker" className="input-date-label">
        Fecha
      </label>
      <input
        type="date"
        id="date-picker"
        className="input-name-input"
        value={value}
        onInput={(event) => {
          onInput(event.target.value);
        }}
      />
    </div>
  );
};

export default InputDate;
