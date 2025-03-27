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

  const handleBarcodeDetected = async (barcodeValue: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call our backend API with the barcode value
      const response = await axios.get(`/api/barcode/${encodeURIComponent(barcodeValue)}`);
      
      // Store the result in localStorage (for history/results page)
      const scanResults = JSON.parse(localStorage.getItem('scanResults') || '[]');
      scanResults.push({
        barcode: barcodeValue,
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
      <h1 className="page-title">Scan a Barcode</h1>
      
      <div className="scanner-wrapper">
        <BarcodeScanner 
          onDetected={handleBarcodeDetected} 
          onError={handleScanError} 
        />
      </div>
      
      {loading && (
        <div className="scan-loading">
          <div className="loader"></div>
          <p>Processing barcode...</p>
        </div>
      )}
      
      {error && (
        <div className="scan-error">
          <p>{error.message}</p>
          <p className="error-time">{error.timestamp.toLocaleTimeString()}</p>
        </div>
      )}
      
      <div className="scan-instructions">
        <h3>Instructions:</h3>
        <ol>
          <li>Press "Start Scanning" to activate the camera</li>
          <li>Position the barcode within the scanner view</li>
          <li>Hold steady until the barcode is detected</li>
          <li>View the product details on the results page</li>
        </ol>
      </div>
    </div>
  );
};

export default ScanPage;
