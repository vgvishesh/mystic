import React, { useState } from 'react';
import axios from 'axios';
import WisdomForm from '../components/WisdomForm';
import WisdomResponse from '../components/WisdomResponse';

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

  const handleSubmitProblem = async (problem: string) => {
    setLoading(true);
    setError('');
    
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
    <div className="container">
      <section className="section">
        <h1 className="section-title">Wisdom from Ancient India</h1>
        <p>
          Seeking guidance for life's challenges? Our ancient texts contain timeless wisdom.
          Share your problem, and receive insights from the Upanishads, Mahabharata, Ramayana, and other sacred texts.
        </p>
        
        <WisdomForm onSubmit={handleSubmitProblem} disabled={loading} />
        
        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Consulting the ancient texts...</p>
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
        
        {wisdom && <WisdomResponse wisdomData={wisdom} />}
      </section>
    </div>
  );
};

export default HomePage;
