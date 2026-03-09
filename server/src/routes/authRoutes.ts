import { Router } from 'express';
import { register, login, getMe, updateProfile, changePassword, verifyEmail, googleLogin, resendVerification, anonymousLogin, verifyToken, uploadAvatar } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/register', register);
router.post('/resend-verification', resendVerification);
router.get('/verify', verifyEmail);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/anonymous', anonymousLogin);
router.get('/verify-token', authenticateToken, verifyToken);
router.get('/me', authenticateToken, getMe);
router.post('/profile', authenticateToken, updateProfile);
router.post('/change-password', authenticateToken, changePassword);
router.post('/avatar', authenticateToken, upload.single('avatar'), uploadAvatar);

export default router;
