import express from 'express';
import { BarcodeController } from '../controllers/barcode.controller';

const router = express.Router();
const barcodeController = new BarcodeController();

// GET /api/barcode/:barcode - Lookup product by barcode
router.get('/:barcode', (req, res) => barcodeController.lookupBarcode(req, res));

export default router;
