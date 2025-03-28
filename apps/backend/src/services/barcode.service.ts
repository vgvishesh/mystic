import axios from 'axios';

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

/**
 * Service for barcode scanning and product lookup functionality
 */
export class BarcodeService {
  // Placeholder for a real product database/API
  private productDatabase: Map<string, ProductInfo>;
  
  constructor() {
    // Initialize with some sample products
    this.productDatabase = new Map<string, ProductInfo>();
    
    // Add some sample products (in a real app, would connect to actual API/database)
    this.initializeSampleProducts();
  }
  
  /**
   * Lookup product information by barcode
   * @param barcode The scanned barcode value
   * @returns Product information if found
   */
  async lookupBarcode(barcode: string): Promise<ProductInfo> {
    // Check if product exists in our "database"
    const product = this.productDatabase.get(barcode);
    
    if (product) {
      return product;
    }
    
    // If not in our database, we could query an external API
    // For demo purposes, if not found, we'll generate a placeholder
    try {
      // In a real implementation, you would query an actual barcode API like:
      // const response = await axios.get(`https://api.example.com/products/${barcode}`);
      // return response.data;
      
      // For demo, we'll create a placeholder
      return this.generatePlaceholderProduct(barcode);
    } catch (error) {
      console.error(`Error looking up barcode ${barcode}:`, error);
      throw new Error('Failed to lookup product information');
    }
  }
  
  /**
   * Initialize the sample product database with some products
   * In a real app, this would be a database connection
   */
  private initializeSampleProducts() {
    // UPC/EAN codes for sample products
    this.productDatabase.set('9780201896831', {
      id: '9780201896831',
      name: 'The Art of Computer Programming, Vol. 1',
      description: 'Fundamental Algorithms by Donald E. Knuth. A comprehensive treatise on programming algorithms.',
      manufacturer: 'Addison-Wesley Professional',
      category: 'Books',
      price: 59.99,
      image: 'https://upload.wikimedia.org/wikipedia/en/c/c7/Art_of_Computer_Programming_Vol1.jpg',
      attributes: {
        'Author': 'Donald E. Knuth',
        'Format': 'Hardcover',
        'Pages': '672',
        'Published': '1997'
      }
    });
    
    this.productDatabase.set('5901234123457', {
      id: '5901234123457',
      name: 'Organic Green Tea',
      description: 'Premium organic green tea sourced from the mountains of Japan. Rich in antioxidants with a subtle, refined flavor.',
      manufacturer: 'TeaOrganics',
      category: 'Food & Beverage',
      price: 12.95,
      image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5',
      attributes: {
        'Weight': '100g',
        'Origin': 'Japan',
        'Organic': 'Yes',
        'Caffeine': 'Medium'
      }
    });
    
    this.productDatabase.set('4003994155486', {
      id: '4003994155486',
      name: 'Wireless Noise-Cancelling Headphones',
      description: 'Premium headphones with active noise cancellation, 30-hour battery life, and premium sound quality.',
      manufacturer: 'AudioTech',
      category: 'Electronics',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      attributes: {
        'Battery Life': '30 hours',
        'Connectivity': 'Bluetooth 5.0',
        'Noise Cancellation': 'Active',
        'Weight': '250g',
        'Color': 'Black'
      }
    });
  }
  
  /**
   * Generate a placeholder product when barcode is not found
   * In a real application, this would be handled differently
   */
  private generatePlaceholderProduct(barcode: string): ProductInfo {
    return {
      id: barcode,
      name: `Unknown Product (${barcode})`,
      description: 'This product was not found in our database. The information shown is a placeholder.',
      manufacturer: 'Unknown Manufacturer',
      category: 'Uncategorized',
      attributes: {
        'Barcode Type': this.detectBarcodeType(barcode),
        'Scan Time': new Date().toLocaleString()
      }
    };
  }
  
  /**
   * Simple helper to detect the likely barcode type based on format
   * In a real app, the scanning library would provide this information
   */
  private detectBarcodeType(barcode: string): string {
    if (/^\d{13}$/.test(barcode)) {
      return 'EAN-13';
    } else if (/^\d{12}$/.test(barcode)) {
      return 'UPC-A';
    } else if (/^\d{8}$/.test(barcode)) {
      return 'EAN-8';
    } else if (/^\d{14}$/.test(barcode)) {
      return 'GTIN-14';
    } else {
      return 'Unknown Format';
    }
  }
}
