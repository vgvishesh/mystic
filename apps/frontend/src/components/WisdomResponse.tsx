import React from 'react';
import './WisdomResponse.css';

interface WisdomSource {
  name: string;
  type: string;
  section?: string;
}

interface WisdomData {
  wisdom: string;
  sources: WisdomSource[];
  problem: string;
}

interface WisdomResponseProps {
  wisdomData: WisdomData;
}

const WisdomResponse: React.FC<WisdomResponseProps> = ({ wisdomData }) => {
  const { wisdom, sources, problem } = wisdomData;

  // Helper function to identify Sanskrit verses in Devanagari script
  const formatWisdomContent = (content: string) => {
    const paragraphs = content.split('\n');
    
    return paragraphs.map((paragraph, idx) => {
      // Check if paragraph is likely a Sanskrit shloka in Devanagari
      // (contains Devanagari Unicode characters)
      const isDevanagari = /[\u0900-\u097F]/.test(paragraph);
      
      // Check if paragraph appears to be a transliteration (often has diacritical marks)
      const isTransliteration = /[āīūṛṝḷḹṃḥṅñṭḍṇśṣ]/.test(paragraph) && 
                               !isDevanagari && 
                               paragraph.trim().length > 10;
      
      if (isDevanagari) {
        return (
          <div key={idx} className="sanskrit-verse">
            <p>{paragraph}</p>
          </div>
        );
      } else if (isTransliteration) {
        return <p key={idx} className="transliteration">{paragraph}</p>;
      } else {
        return <p key={idx}>{paragraph}</p>;
      }
    });
  };

  return (
    <div className="wisdom-response">
      <h2 className="response-title">Sacred Wisdom</h2>
      
      <div className="wisdom-card">
        <div className="problem-statement">
          <h3>Your Question:</h3>
          <p>{problem}</p>
        </div>
        
        <div className="wisdom-content">
          {formatWisdomContent(wisdom)}
        </div>
        
        {sources.length > 0 && (
          <div className="wisdom-sources">
            <h4>Sources of Wisdom:</h4>
            <div className="source-tags">
              {sources.map((source, idx) => (
                <span key={idx} className="source-tag">
                  {source.name} {source.section ? `(${source.section})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WisdomResponse;
