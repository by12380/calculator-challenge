import React from 'react';
import './CalculatorInput.css'

function CalculatorInput({
  onInputChange
}) {
  return (
    <input
      className="calculator-input"
      onChange={onInputChange}
    />
  );
}

export default CalculatorInput;