import { Router } from 'express';
import { createAssessment, getUserAssessments } from '../controllers/assessmentController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/', authenticateToken, createAssessment);
router.get('/', authenticateToken, getUserAssessments);

export default router;
