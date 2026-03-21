import { Router } from 'express';
import { getUserAnalytics } from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getUserAnalytics);

export default router;
