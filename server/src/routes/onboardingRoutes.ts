import { Router } from 'express';
import { updateOnboarding, getOnboardingStatus } from '../controllers/onboardingController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All onboarding routes require authentication
router.use(authenticateToken);

router.get('/status', getOnboardingStatus);
router.post('/update', updateOnboarding);

export default router;
