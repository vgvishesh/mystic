import React, { useState } from 'react';
import { ArrowUp, Loader  } from 'react-feather';
import './WisdomForm.css';

interface WisdomFormProps {
  onSubmit: (problem: string) => void;
  disabled?: boolean;
}

const WisdomForm: React.FC<WisdomFormProps> = ({ onSubmit, disabled = false }) => {
  const [problem, setProblem] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim() && !disabled) {
      onSubmit(problem);
      setProblem(''); // Clear the input after submission
    }
  };

  // Detect if we're in the homepage context based on the parent container class
  const isHomePage = document.querySelector('.home-mode') !== null;
  const placeholder = isHomePage 
    ? "Ask a question about life, consciousness, or spiritual growth..." 
    : "Ask another question...";

  return (
    <form className="wisdom-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        className="input-field"
        disabled={disabled}
        autoFocus={isHomePage}
      />
      <button type="submit" className="submit-button" disabled={!problem.trim() || disabled}>
        {disabled ? <Loader size={18} className="icon-pulse" /> : <ArrowUp size={18} />}
      </button>
    </form>
  );
};

export default WisdomForm;
