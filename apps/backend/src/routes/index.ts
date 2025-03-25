import { Router } from 'express';
import wisdomRoutes from './wisdom.routes';

const router = Router();

// Mount routes
router.use('/wisdom', wisdomRoutes);

export const apiRoutes = router;
