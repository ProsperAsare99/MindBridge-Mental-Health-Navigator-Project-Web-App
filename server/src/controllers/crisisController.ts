import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { CrisisService } from '../services/crisisService';

export const getClinicalBrief = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: 'Not authenticated' });
        
        const brief = await CrisisService.generateClinicalBrief(req.userId);
        res.json(brief);
    } catch (error) {
        console.error('Clinical Brief Error:', error);
        res.status(500).json({ error: 'Failed to generate clinical brief for intervention.' });
    }
};
