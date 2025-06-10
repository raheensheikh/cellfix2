import React from "react";

const LabeledInput = ({ label, placeholder, className = "", ...props }) => {
  return (
    <div className={`labeled-input ${className}`}>
      <label className="input-label">{label}</label>
      <input
        className="input-field"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default LabeledInput;
