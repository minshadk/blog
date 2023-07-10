import React from "react";

export default function Input({ value, setValue, label, type }) {
  const handleInput = (value) => {
    setValue(value);
    console.log(value);
  };
  return (
    <div>
      <label>{label}:</label>
      <input
        type={type}
        onChange={(e) => handleInput(e.target.value)}
        value={value}
      />
    </div>
  );
}
