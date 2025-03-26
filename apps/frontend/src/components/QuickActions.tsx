import React from 'react';
import './QuickActions.css';
import { Eye, Heart, Sun } from 'react-feather';

interface QuickActionsProps {
  onSelect: (question: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onSelect }) => {
  const questions = [
    {
      icon: <Eye size={18} />,
      title: 'What is the nature of consciousness?',
    },
    {
      icon: <Heart size={18} />,
      title: 'How can I find inner peace?',
    },
    {
      icon: <Sun size={18} />,
      title: 'What is the purpose of life?',
    },
  ];

  return (
    <div className="quick-actions">
      {questions.map((question, index) => (
        <div 
          key={index}
          className="quick-action-item"
          onClick={() => onSelect(question.title)}
        >
          <div className="quick-action-icon">{question.icon}</div>
          <div className="quick-action-title">{question.title}</div>
        </div>
      ))}
    </div>
  );
};

export default QuickActions; 