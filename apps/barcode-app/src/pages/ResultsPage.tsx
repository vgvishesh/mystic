import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './ResultsPage.css';

interface ProductInfo {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  category: string;
  price?: number;
  image?: string;
  attributes?: Record<string, string>;
}

interface ScanResult {
  barcode: string;
  format?: string;
  result: ProductInfo;
  timestamp: string;
}

const ResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const barcodeParam = searchParams.get('barcode');
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [barcodeFormat, setBarcodeFormat] = useState<string>('');
  const [barcodeValue, setBarcodeValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProductData = async () => {
      // If there's no barcode in URL, check localStorage for the most recent scan
      if (!barcodeParam) {
        const scanResults: ScanResult[] = JSON.parse(localStorage.getItem('scanResults') || '[]');
        if (scanResults.length > 0) {
          // Get the most recent scan
          const latestScan = scanResults[scanResults.length - 1];
          setProduct(latestScan.result);
          setBarcodeValue(latestScan.barcode);
          setBarcodeFormat(latestScan.format || 'Unknown');
          return;
        } else {
          // No recent scans found
          setError('No barcode provided. Please scan a barcode first.');
          return;
        }
      }
      
      setLoading(true);
      setError('');
      setBarcodeValue(barcodeParam);
      
      try {
        // Try to get the product from localStorage first
        const scanResults: ScanResult[] = JSON.parse(localStorage.getItem('scanResults') || '[]');
        const existingScan = scanResults.find(scan => scan.barcode === barcodeParam);
        
        if (existingScan) {
          setProduct(existingScan.result);
          setBarcodeFormat(existingScan.format || 'Unknown');
        } else {
          // If not in localStorage, fetch from API
          const response = await axios.get(`/api/barcode/${encodeURIComponent(barcodeParam)}`);
          setProduct(response.data);
          
          // Save to localStorage
          scanResults.push({
            barcode: barcodeParam,
            format: 'Unknown', // No format info when fetching directly
            result: response.data,
            timestamp: new Date().toISOString()
          });
          localStorage.setItem('scanResults', JSON.stringify(scanResults));
        }
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Failed to retrieve product information');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [barcodeParam]);
  
  const handleScanAgain = () => {
    navigate('/scan');
  };
  
  const renderProductDetails = () => {
    if (!product) return null;
    
    return (
      <div className="product-details">
        {product.image && (
          <div className="product-image-container">
            <img src={product.image} alt={product.name} className="product-image" />
          </div>
        )}
        
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          
          {product.price !== undefined && (
            <div className="product-price">
              ${product.price.toFixed(2)}
            </div>
          )}
          
          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Manufacturer:</span>
              <span className="meta-value">{product.manufacturer}</span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category}</span>
            </div>
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          {product.attributes && Object.keys(product.attributes).length > 0 && (
            <div className="product-attributes">
              <h3>Specifications</h3>
              <div className="attributes-list">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="attribute-item">
                    <span className="attribute-label">{key}</span>
                    <span className="attribute-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="results-page">
      <h1 className="page-title">Product Information</h1>
      
      {loading ? (
        <div className="results-loading">
          <div className="loader"></div>
          <p>Loading product information...</p>
        </div>
      ) : error ? (
        <div className="results-error">
          <p>{error}</p>
          <button onClick={handleScanAgain} className="action-button">Scan a Code</button>
        </div>
      ) : (
        <>
          <div className="results-card">
            <div className="barcode-info">
              <h3>Scanned {barcodeFormat.includes('QR') ? 'QR Code' : 'Barcode'}</h3>
              <div className="code-details">
                <div className="meta-item">
                  <span className="meta-label">Value:</span>
                  <span className="barcode-value">{barcodeValue}</span>
                </div>
                {barcodeFormat && (
                  <div className="meta-item">
                    <span className="meta-label">Format:</span>
                    <span className="barcode-format">{barcodeFormat}</span>
                  </div>
                )}
              </div>
            </div>
            
            {renderProductDetails()}
          </div>
          
          <div className="results-actions">
            <button onClick={handleScanAgain} className="action-button">Scan Another Code</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsPage;
