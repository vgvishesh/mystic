import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, Result, NotFoundException, BarcodeFormat, DecodeHintType } from '@zxing/library';
import './BarcodeScanner.css';

interface BarcodeScannerProps {
  onDetected: (result: string, format: string) => void;
  onError?: (error: Error) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [permissions, setPermissions] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string>('');

  // Configure formats to detect both barcodes and QR codes
  const hints = new Map();
  const formats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_128,
    BarcodeFormat.ITF,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.AZTEC
  ];
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  hints.set(DecodeHintType.TRY_HARDER, true);

  // Create a reader instance with the configured formats
  const reader = new BrowserMultiFormatReader(hints);

  // Check for camera permissions and set up scanner
  useEffect(() => {
    const setupScanner = async () => {
      try {
        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
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
            const format = result.getBarcodeFormat().toString();
            console.log(`Detected ${format}: ${barcodeValue}`);

            // Immediately stop scanning to prevent multiple API calls
            stopScanning();

            // Then call the onDetected callback
            onDetected(barcodeValue, format);
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
    try {
      reader.reset();
      setScanning(false);
      console.log('Scanner stopped');
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
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
          <div className="scanner-guide">
            <div className="guide-text">Position barcode or QR code in this area</div>
          </div>
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
