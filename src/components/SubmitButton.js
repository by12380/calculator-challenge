import React from 'react';
import './SubmitButton.css'

function SubmitButton({
  onClick
}) {
  return (
    <button
      className="submit-btn"
      onClick={onClick}
    >
      Calulate
    </button>
  );
}

export default SubmitButton;