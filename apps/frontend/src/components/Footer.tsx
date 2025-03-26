import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Mystic Wisdom</p>
        </div>
    </footer>
  );
};

export default Footer;
