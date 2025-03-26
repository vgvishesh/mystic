import React from 'react';
import bannerImage from '../assets/banner.png';

const AboutPage: React.FC = () => {
  return (
    <div className="container answer-mode">
      <div className="bg-overlay"></div>
      
      <div className="about-container">
        <div className="banner">
          <img src={bannerImage} alt="Wisdom Banner" style={{ objectFit: 'contain', borderRadius: '20px' }} />
        </div>
        
        <h1 className="section-title">About Mystic Wisdom</h1>
        
        <p className="section-description">
          Connecting ancient Indian wisdom with modern life challenges through AI-powered insights and guidance.
        </p>
        
        <div className="about-content">
          <div className="wisdom-content">
            <p>
              Mystic Wisdom is an application that connects ancient Indian mythology with modern life challenges.
              Drawing from the rich traditions of Upanishads, Mahabharata, Ramayana, and Manusmriti, we provide
              guidance and wisdom for your personal and professional problems.
            </p>
            <p>
              Our AI-powered system analyzes your question and finds relevant stories, teachings, and principles
              from these ancient texts that can help you navigate life's complexities with wisdom and clarity.
            </p>

            <h2>The Sources of Wisdom</h2>
            
            <div className="source-item">
              <div className="source-icon">📜</div>
              <div className="source-info">
                <span className="source-name">Upanishads</span>
                <p>
                  Philosophical texts that form the theoretical basis for Hinduism. They contain discussions on metaphysics,
                  philosophy, and spiritual knowledge, exploring the nature of reality, consciousness, and the self.
                </p>
              </div>
            </div>

            <div className="source-item">
              <div className="source-icon">📚</div>
              <div className="source-info">
                <span className="source-name">Mahabharata</span>
                <p>
                  One of the major Sanskrit epics of ancient India, the Mahabharata is a narrative of the Kurukshetra War
                  and the fates of the Kaurava and the Pandava princes. It contains philosophical and devotional material,
                  including the Bhagavad Gita.
                </p>
              </div>
            </div>

            <div className="source-item">
              <div className="source-icon">📚</div>
              <div className="source-info">
                <span className="source-name">Ramayana</span>
                <p>
                  An ancient Indian epic poem that narrates the journey of Rama, a prince of Ayodhya, whose wife Sita is
                  abducted by Ravana, the demon king of Lanka. It explores themes of duty, righteousness, honor, and virtue.
                </p>
              </div>
            </div>

            <div className="source-item">
              <div className="source-icon">📜</div>
              <div className="source-info">
                <span className="source-name">Manusmriti</span>
                <p>
                  An ancient legal text and constitution among the many Dharmaśāstras of Hinduism. It addresses social,
                  moral, and legal codes, presenting a worldview of natural law and social obligations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="spacer"></div>
    </div>
  );
};

export default AboutPage;
