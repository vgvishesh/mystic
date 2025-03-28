import { Request, Response } from 'express';
import { BarcodeService } from '../services/barcode.service';

export class BarcodeController {
  private barcodeService: BarcodeService;
  
  constructor() {
    this.barcodeService = new BarcodeService();
  }
  
  /**
   * Lookup product information by barcode
   * @param req Express request
   * @param res Express response
   */
  async lookupBarcode(req: Request, res: Response) {
    try {
      const barcode = req.params.barcode;
      
      if (!barcode) {
        return res.status(400).json({ error: 'Barcode is required' });
      }
      
      const productInfo = await this.barcodeService.lookupBarcode(barcode);
      res.json(productInfo);
    } catch (error) {
      console.error('Error in barcode lookup:', error);
      res.status(500).json({ 
        error: 'Failed to lookup product information',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
