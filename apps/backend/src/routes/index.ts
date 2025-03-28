import { Router } from 'express';
import wisdomRoutes from './wisdom.routes';
import barcodeRoutes from './barcode.routes';

const router = Router();

// Mount routes
router.use('/wisdom', wisdomRoutes);
router.use('/barcode', barcodeRoutes);

export const apiRoutes = router;
