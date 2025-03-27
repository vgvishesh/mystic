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
  result: ProductInfo;
  timestamp: string;
}

const ResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const barcodeParam = searchParams.get('barcode');
  const [product, setProduct] = useState<ProductInfo | null>(null);
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
          return;
        } else {
          // No recent scans found
          setError('No barcode provided. Please scan a barcode first.');
          return;
        }
      }
      
      setLoading(true);
      setError('');
      
      try {
        // Try to get the product from localStorage first
        const scanResults: ScanResult[] = JSON.parse(localStorage.getItem('scanResults') || '[]');
        const existingScan = scanResults.find(scan => scan.barcode === barcodeParam);
        
        if (existingScan) {
          setProduct(existingScan.result);
        } else {
          // If not in localStorage, fetch from API
          const response = await axios.get(`/api/barcode/${encodeURIComponent(barcodeParam)}`);
          setProduct(response.data);
          
          // Save to localStorage
          scanResults.push({
            barcode: barcodeParam,
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
            
            <div className="meta-item">
              <span className="meta-label">Product ID:</span>
              <span className="meta-value">{product.id}</span>
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
                    <span className="attribute-label">{key}:</span>
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
      <h1 className="page-title">Product Details</h1>
      
      {loading ? (
        <div className="results-loading">
          <div className="loader"></div>
          <p>Loading product information...</p>
        </div>
      ) : error ? (
        <div className="results-error">
          <p>{error}</p>
          <button className="action-button" onClick={handleScanAgain}>
            Scan a Barcode
          </button>
        </div>
      ) : product ? (
        <>
          <div className="results-card">
            <div className="barcode-info">
              <h3>Barcode</h3>
              <p className="barcode-value">{barcodeParam || 'Unknown'}</p>
            </div>
            
            {renderProductDetails()}
          </div>
          
          <div className="results-actions">
            <button className="action-button" onClick={handleScanAgain}>
              Scan Another Barcode
            </button>
          </div>
        </>
      ) : (
        <div className="results-error">
          <p>No product information available</p>
          <button className="action-button" onClick={handleScanAgain}>
            Scan a Barcode
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
