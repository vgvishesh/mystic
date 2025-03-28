import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeScanner from '../components/BarcodeScanner';
import axios from 'axios';
import './ScanPage.css';

interface ScanError {
  message: string;
  timestamp: Date;
}

const ScanPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ScanError | null>(null);
  const navigate = useNavigate();

  const handleBarcodeDetected = async (barcodeValue: string, format: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call our backend API with the barcode value
      const response = await axios.get(`/api/barcode/${encodeURIComponent(barcodeValue)}`);
      
      // Store the result in localStorage (for history/results page)
      const scanResults = JSON.parse(localStorage.getItem('scanResults') || '[]');
      scanResults.push({
        barcode: barcodeValue,
        format: format,
        result: response.data,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('scanResults', JSON.stringify(scanResults));
      
      // Navigate to the results page with the barcode as a query parameter
      navigate(`/results?barcode=${encodeURIComponent(barcodeValue)}`);
    } catch (err) {
      console.error('Error fetching barcode data:', err);
      setError({
        message: 'Failed to retrieve product information for this barcode',
        timestamp: new Date()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScanError = (error: Error) => {
    setError({
      message: error.message || 'An error occurred while scanning',
      timestamp: new Date()
    });
  };

  return (
    <div className="scan-page">
      <h1 className="page-title">Scan a Barcode or QR Code</h1>
      
      <div className="scan-instructions">
        <p>Position your device's camera to capture a barcode or QR code. The scanner will automatically detect and process the code.</p>
      </div>
      
      <div className="scanner-wrapper">
        <BarcodeScanner 
          onDetected={handleBarcodeDetected} 
          onError={handleScanError} 
        />
      </div>
      
      {loading && (
        <div className="scan-loading">
          <div className="loader"></div>
          <p>Processing code...</p>
        </div>
      )}
      
      {error && (
        <div className="scan-error">
          <p><strong>Error:</strong> {error.message}</p>
          <p className="error-time">Time: {error.timestamp.toLocaleTimeString()}</p>
        </div>
      )}
      
      <div className="scan-tips">
        <h3>Scanning Tips:</h3>
        <ul>
          <li>Make sure the code is well-lit and clear of obstructions</li>
          <li>Hold your device steady to prevent blurry images</li>
          <li>Position the code within the guide area on the screen</li>
          <li>For QR codes, ensure the entire square is visible</li>
        </ul>
      </div>
    </div>
  );
};

export default ScanPage;
