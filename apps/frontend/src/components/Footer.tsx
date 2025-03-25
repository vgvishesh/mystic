import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Mytic Wisdom. All rights reserved.</p>
          <p className="footer-tagline">
            Connecting ancient wisdom with modern challenges
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
