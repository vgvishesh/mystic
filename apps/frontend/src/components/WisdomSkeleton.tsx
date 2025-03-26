import React from 'react';
import ContentLoader from 'react-content-loader';
import './WisdomSkeleton.css';
import bannerImage from '../assets/banner.png';

interface WisdomSkeletonProps {
  question: string;
}

const WisdomSkeleton: React.FC<WisdomSkeletonProps> = ({ question }) => {
  return (
    <div className="wisdom-response wisdom-skeleton">
      <div className="wisdom-header">
        <div className="header-banner">
          <img src={bannerImage} alt="Wisdom Banner" />
        </div>
        <div className="header-content">
          <h1 className="response-title">{question}</h1>
          <div className="response-subtitle">Key wisdom from upanishada</div>
          <div className="nav-tabs">
            <div className="nav-tab active">
              <span>Answer</span>
            </div>
            <div className="nav-tab">
              <span>Sources</span>
              <span className="sources-count">1</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="wisdom-content">
        <ContentLoader 
          speed={2}
          width="100%"
          height={400}
          backgroundColor="rgba(151, 118, 240, 0.1)"
          foregroundColor="rgba(151, 118, 240, 0.2)"
        >
          {/* Sanskrit verse block */}
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="100" />
          
          {/* Transliteration */}
          <rect x="20" y="120" rx="4" ry="4" width="90%" height="20" />
          
          {/* Translation paragraphs */}
          <rect x="0" y="160" rx="4" ry="4" width="100%" height="16" />
          <rect x="0" y="186" rx="4" ry="4" width="95%" height="16" />
          <rect x="0" y="212" rx="4" ry="4" width="98%" height="16" />
          
          {/* Explanation paragraphs */}
          <rect x="0" y="248" rx="4" ry="4" width="100%" height="16" />
          <rect x="0" y="274" rx="4" ry="4" width="92%" height="16" />
          <rect x="0" y="300" rx="4" ry="4" width="97%" height="16" />
          <rect x="0" y="326" rx="4" ry="4" width="94%" height="16" />
        </ContentLoader>
      </div>
    </div>
  );
};

export default WisdomSkeleton; 