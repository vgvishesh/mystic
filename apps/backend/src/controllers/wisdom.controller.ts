import { Request, Response } from 'express';
import { WisdomService } from '../services/wisdom.service';

/**
 * Controller to handle wisdom requests
 * @param req Express request object containing the user's problem
 * @param res Express response object
 */
export const getWisdom = async (req: Request, res: Response) => {
  try {
    const { problem } = req.body;
    
    if (!problem) {
      return res.status(400).json({ message: 'Please provide a problem description' });
    }
    
    const wisdomService = new WisdomService();
    const response = await wisdomService.getWisdomForProblem(problem);
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting wisdom:', error);
    return res.status(500).json({ 
      message: 'Failed to get wisdom',
      error: process.env.NODE_ENV === 'production' ? undefined : error
    });
  }
};
