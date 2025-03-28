import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Barcode Scanner</h1>
        <p className="hero-text">
          Quickly scan and look up product information with our powerful barcode scanner.
        </p>
        <Link to="/scan" className="cta-button">
          Start Scanning
        </Link>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Quick Scanning</h3>
            <p>Scan any barcode in seconds using your device's camera</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Product Lookup</h3>
            <p>Get detailed information about the scanned products</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>History</h3>
            <p>View your previously scanned items for reference</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Multiple Formats</h3>
            <p>Supports various barcode formats including UPC, EAN, and QR codes</p>
          </div>
        </div>
      </div>

      <div className="instructions-section">
        <h2>How to Use</h2>
        <ol className="instructions-list">
          <li>
            <strong>Navigate to Scan:</strong> Click on the "Start Scanning" button or select "Scan" from the navigation menu
          </li>
          <li>
            <strong>Allow Camera Access:</strong> When prompted, allow the app to access your device's camera
          </li>
          <li>
            <strong>Scan a Barcode:</strong> Point your camera at any barcode until it's detected
          </li>
          <li>
            <strong>View Results:</strong> Once detected, you'll see detailed information about the product
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HomePage;
