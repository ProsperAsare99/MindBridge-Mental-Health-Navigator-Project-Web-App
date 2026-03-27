import { Router } from 'express';
import { getUserAnalytics, getMoodInsight, getActivityFeed, logActivity, getRecommendations, getCurrentCarePlan, getDeepDiveAnalytics, toggleCarePlanTask } from '../controllers/analyticsController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/', authenticateToken, getUserAnalytics);
router.get('/activity-feed', authenticateToken, getActivityFeed);
router.get('/recommendations', authenticateToken, getRecommendations);
router.get('/care-plan', authenticateToken, getCurrentCarePlan);
router.get('/deep-dive', authenticateToken, getDeepDiveAnalytics);
router.post('/log-activity', authenticateToken, logActivity);
router.post('/mood-insight', authenticateToken, getMoodInsight);
router.post('/care-plan/toggle', authenticateToken, toggleCarePlanTask);

export default router;
