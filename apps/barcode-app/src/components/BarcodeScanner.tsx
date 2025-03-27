import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, Result, NotFoundException } from '@zxing/library';
import './BarcodeScanner.css';

interface BarcodeScannerProps {
  onDetected: (result: string) => void;
  onError?: (error: Error) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [permissions, setPermissions] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string>('');
  
  // Create a reader instance
  const reader = new BrowserMultiFormatReader();

  // Check for camera permissions and set up scanner
  useEffect(() => {
    const setupScanner = async () => {
      try {
        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setPermissions(true);
        setCameraError('');
        
        // Clean up the stream
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error('Error accessing camera:', err);
        setCameraError('Camera access denied or not available');
        if (onError) onError(err as Error);
      }
    };
    
    setupScanner();
    
    // Clean up when component unmounts
    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    if (!permissions || !videoRef.current) {
      setCameraError('Camera permissions not granted');
      return;
    }
    
    try {
      setScanning(true);
      
      // Start continuous scanning from the video element
      await reader.decodeFromVideoDevice(
        null, // Use default camera
        videoRef.current,
        (result: Result | null, error?: NotFoundException) => {
          if (result) {
            const barcodeValue = result.getText();
            onDetected(barcodeValue);
            // Don't stop scanning - let the parent component decide
          }
          
          if (error && error instanceof NotFoundException) {
            // No barcode found - this is normal during scanning
            // We don't need to handle this as an error
          } else if (error) {
            console.error('Scanning error:', error);
            if (onError) onError(error);
          }
        }
      );
    } catch (err) {
      console.error('Error starting scanner:', err);
      setCameraError('Failed to start the scanner');
      setScanning(false);
      if (onError) onError(err as Error);
    }
  };

  const stopScanning = () => {
    reader.reset();
    setScanning(false);
  };

  return (
    <div className="barcode-scanner">
      {cameraError && (
        <div className="scanner-error">
          <p>{cameraError}</p>
        </div>
      )}
      
      <div className="scanner-container">
        <video 
          ref={videoRef} 
          className="scanner-video"
          muted
          playsInline
        />
        {scanning && <div className="scanner-overlay">
          <div className="scanner-line"></div>
        </div>}
      </div>
      
      <div className="scanner-controls">
        {!scanning ? (
          <button 
            className="scan-button" 
            onClick={startScanning}
            disabled={!permissions || !!cameraError}
          >
            Start Scanning
          </button>
        ) : (
          <button 
            className="scan-button stop" 
            onClick={stopScanning}
          >
            Stop Scanning
          </button>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;
