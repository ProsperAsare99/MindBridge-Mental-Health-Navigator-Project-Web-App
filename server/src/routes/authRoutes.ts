import { Router } from 'express';
import { register, login, getMe, updateProfile, changePassword, verifyEmail, googleLogin, resendVerification } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/resend-verification', resendVerification);
router.get('/verify', verifyEmail);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/me', authenticateToken, getMe);
router.post('/profile', authenticateToken, updateProfile);
router.post('/change-password', authenticateToken, changePassword);

export default router;
