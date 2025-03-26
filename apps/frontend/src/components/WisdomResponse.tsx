import React, { useState } from 'react';
import './WisdomResponse.css';
import bannerImage from '../assets/banner-wide.png';
import { Copy } from 'react-feather';

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
  const [activeTab, setActiveTab] = useState<'answer' | 'sources'>('answer');
  const { wisdom, sources, problem } = wisdomData;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wisdom)
      .then(() => {
        // Optional: Add a success indicator
        console.log('Content copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const formatWisdomContent = (content: string) => {
    // Split content into sections based on markdown-style headings
    const sections = content.split(/\*\*([^*]+)\*\*/);
    
    return sections.map((section, index) => {
      if (index % 2 === 1) {
        // This is a heading (was between ** **)
        return <h2 key={index}>{section}</h2>;
      } else if (section.trim()) {
        // This is regular content
        const paragraphs = section.split('\n\n');
        return paragraphs.map((paragraph, pIndex) => {
          if (paragraph.trim().startsWith('"')) {
            // This is a Sanskrit verse
            return (
              <div key={`${index}-${pIndex}`} className="sanskrit-verse">
                <p>{paragraph.trim()}</p>
              </div>
            );
          }
          return <p key={`${index}-${pIndex}`}>{paragraph.trim()}</p>;
        });
      }
      return null;
    });
  };

  return (
    <div className="wisdom-response">
      <div className="wisdom-header">
        <div className="header-banner">
          <img src={bannerImage} alt="Wisdom Banner" />
        </div>
        <div className="header-content">
          <h1 className="response-title">{problem}</h1>
          <div className="response-subtitle">Key wisdom from upanishada</div>
          <div className="nav-tabs">
            <div 
              className={`nav-tab ${activeTab === 'answer' ? 'active' : ''}`}
              onClick={() => setActiveTab('answer')}
            >
              <span>Answer</span>
            </div>
            <div 
              className={`nav-tab ${activeTab === 'sources' ? 'active' : ''}`}
              onClick={() => setActiveTab('sources')}
            >
              <span>Sources</span>
              <span className="sources-count">{sources.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="wisdom-content">
        {activeTab === 'answer' && (
          <>
            <div className="answer-container">
              {formatWisdomContent(wisdom)}
            </div>
            <button 
              className="copy-button" 
              onClick={copyToClipboard}
              aria-label="Copy to clipboard"
            >
              <Copy size={18} />
            </button>
          </>
        )}
        
        {activeTab === 'sources' && (
          <div className="sources-content">
            {sources.map((source, index) => (
              <div key={index} className="source-item">
                <div className="source-icon">
                  {source.type === 'upanishad' ? '📜' : '📚'}
                </div>
                <div className="source-info">
                  <span className="source-name">{source.name}</span>
                  {source.section && (
                    <span className="source-section">{source.section}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="spacer"></div>
    </div>
  );
};

export default WisdomResponse;
