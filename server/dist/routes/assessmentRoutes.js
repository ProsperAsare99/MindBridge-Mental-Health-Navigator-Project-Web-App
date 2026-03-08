import { Router } from 'express';
import { createAssessment, getUserAssessments } from '../controllers/assessmentController.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
router.post('/', authenticateToken, createAssessment);
router.get('/', authenticateToken, getUserAssessments);
export default router;
//# sourceMappingURL=assessmentRoutes.js.map