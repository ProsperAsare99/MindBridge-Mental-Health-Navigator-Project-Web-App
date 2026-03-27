import { Router } from 'express';
import { getClinicalBrief } from '../controllers/crisisController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/brief', authenticateToken, getClinicalBrief);

export default router;
