import { Router } from 'express';
import { getWisdom } from '../controllers/wisdom.controller';

const router = Router();

// Route for getting wisdom based on user's problem
router.post('/', getWisdom);

export default router;
