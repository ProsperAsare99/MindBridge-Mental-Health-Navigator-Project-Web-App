import { Router } from 'express';
import { getUserAnalytics, getMoodInsight, getActivityFeed, logActivity } from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getUserAnalytics);
router.get('/activity-feed', authenticateToken, getActivityFeed);
router.post('/log-activity', authenticateToken, logActivity);
router.post('/mood-insight', authenticateToken, getMoodInsight);

export default router;
