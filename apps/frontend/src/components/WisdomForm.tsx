import React, { useState } from 'react';
import './WisdomForm.css';

interface WisdomFormProps {
  onSubmit: (problem: string) => void;
  disabled: boolean;
}

const WisdomForm: React.FC<WisdomFormProps> = ({ onSubmit, disabled }) => {
  const [problem, setProblem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim()) {
      onSubmit(problem);
    }
  };

  return (
    <div className="wisdom-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="problem">What challenge are you facing?</label>
          <textarea
            id="problem"
            placeholder="Describe your problem or question..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
            disabled={disabled}
            rows={5}
          />
        </div>
        <div className="form-footer">
          <button 
            type="submit" 
            className="btn" 
            disabled={disabled || !problem.trim()}
          >
            {disabled ? 'Consulting...' : 'Get Wisdom'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WisdomForm;
