import { Router } from 'express';
import { getUserAnalytics, getMoodInsight, getActivityFeed, logActivity, getRecommendations } from '../controllers/analyticsController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/', authenticateToken, getUserAnalytics);
router.get('/activity-feed', authenticateToken, getActivityFeed);
router.get('/recommendations', authenticateToken, getRecommendations);
router.post('/log-activity', authenticateToken, logActivity);
router.post('/mood-insight', authenticateToken, getMoodInsight);

export default router;
