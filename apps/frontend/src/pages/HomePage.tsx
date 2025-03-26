import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WisdomForm from '../components/WisdomForm';
import WisdomResponse from '../components/WisdomResponse';
import WisdomSkeleton from '../components/WisdomSkeleton';
import QuickActions from '../components/QuickActions';
import bannerImage from '../assets/banner.png';

interface WisdomData {
  wisdom: string;
  sources: {
    name: string;
    type: string;
    section?: string;
  }[];
  problem: string;
}

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [wisdom, setWisdom] = useState<WisdomData | null>(null);
  const [error, setError] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const showAnswerState = loading || wisdom || currentQuestion;

  // Ensure the page fits within the viewport without scrolling
  useEffect(() => {
    const adjustHeight = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', adjustHeight);
    adjustHeight();
    
    // Toggle body class based on mode
    if (!showAnswerState) {
      document.body.classList.add('home-mode-active');
    } else {
      document.body.classList.remove('home-mode-active');
    }
    
    return () => {
      window.removeEventListener('resize', adjustHeight);
      document.body.classList.remove('home-mode-active');
    };
  }, [showAnswerState]);

  const handleSubmitProblem = async (problem: string) => {
    setLoading(true);
    setError('');
    setWisdom(null);
    setCurrentQuestion(problem);
    
    try {
      const response = await axios.post('/api/wisdom', { problem });
      setWisdom(response.data);
    } catch (err) {
      console.error('Error fetching wisdom:', err);
      setError('Failed to get wisdom. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${showAnswerState ? 'answer-mode' : 'home-mode'}`}>
      <div className="bg-overlay"></div>
      
      {!showAnswerState && (
        <div className="empty-state">
          <div className="banner">
            {/* add style to update contain mode for img*/}
            <img src={bannerImage} alt="Wisdom Banner" style={{ objectFit: 'contain', borderRadius: '20px' }} />
          </div>
          <h1 className="section-title">Key wisdom from upanishada</h1>
          <p className="section-description">
            Discover timeless insights from ancient Indian wisdom. Ask any question about life, consciousness, or spiritual growth, and receive guidance from the sacred texts.
          </p>
          
          <div className="home-search-container">
            <WisdomForm onSubmit={handleSubmitProblem} disabled={loading} />
          </div>
          
          <QuickActions onSelect={handleSubmitProblem} />
        </div>
      )}
      
      {loading && currentQuestion && <WisdomSkeleton question={currentQuestion} />}
      
      {error && <div className="error-message">{error}</div>}
      
      {wisdom && <WisdomResponse wisdomData={wisdom} />}
      
      {showAnswerState && (
        <div className="input-container">
          <WisdomForm onSubmit={handleSubmitProblem} disabled={loading} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
