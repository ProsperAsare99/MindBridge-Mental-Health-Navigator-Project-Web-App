"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.changePassword = exports.uploadAvatar = exports.updateProfile = exports.getMe = exports.verifyEmail = exports.resendVerification = exports.anonymousLogin = exports.googleLogin = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const emailService_1 = require("../utils/emailService");
const google_auth_library_1 = require("google-auth-library");
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_for_development';
if (JWT_SECRET === 'your_fallback_secret_for_development') {
    console.warn('[AUTH CONTROLLER WARNING] JWT_SECRET is using the fallback value.');
}
else {
    console.log('[AUTH CONTROLLER INFO] JWT_SECRET loaded from environment.');
}
const register = async (req, res) => {
    const { email, password, name, institution, studentId, course, phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }
    // Basic format validation
    if (!/^\+?[\d\s-]{8,20}$/.test(phoneNumber)) {
        return res.status(400).json({ error: 'Invalid phone number format' });
    }
    try {
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = password ? await bcryptjs_1.default.hash(password, 10) : null;
        const user = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                displayName: name,
                university: mapInstitutionToUniversity(institution),
                studentId,
                program: course,
                phoneNumber,
                isVerified: true
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            user: {
                ...user,
                onboardingStep: user.onboardingStep,
                onboardingCompleted: user.onboardingCompleted
            },
            token
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(`[AUTH] Login attempt received for: ${email}`);
    try {
        let user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Auto-verify user if they are not already
        if (!user.isVerified) {
            user = await prisma_1.default.user.update({
                where: { id: user.id },
                data: { isVerified: true }
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            user: {
                ...user,
                onboardingStep: user.onboardingStep,
                onboardingCompleted: user.onboardingCompleted
            },
            token
        });
    }
    catch (error) {
        const errorMsg = `[LOGIN ERROR] ${new Date().toISOString()}: ${error.message}\n${error.stack}\n\n`;
        require('fs').appendFileSync('error_debug.log', errorMsg);
        console.error("DETAILED LOGIN ERROR:", error);
        res.status(500).json({
            error: 'Server error during login',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
exports.login = login;
const googleLogin = async (req, res) => {
    const { idToken } = req.body;
    if (!idToken) {
        return res.status(400).json({ error: 'ID Token is required' });
    }
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return res.status(400).json({ error: 'Invalid Google token' });
        }
        const { email, sub: googleId, name, picture } = payload;
        // Find or create user
        let user = await prisma_1.default.user.findFirst({
            where: {
                OR: [
                    { googleId },
                    { email }
                ]
            }
        });
        if (!user) {
            user = await prisma_1.default.user.create({
                data: {
                    email,
                    googleId,
                    displayName: name,
                    isVerified: true, // Google emails are already verified
                }
            });
        }
        else {
            // Ensure google user is verified and googleId is linked
            if (!user.isVerified || !user.googleId) {
                user = await prisma_1.default.user.update({
                    where: { id: user.id },
                    data: { googleId, isVerified: true }
                });
            }
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            user: {
                ...user,
                onboardingStep: user.onboardingStep,
                onboardingCompleted: user.onboardingCompleted
            },
            token
        });
    }
    catch (error) {
        console.error('Google Auth Error:', error);
        res.status(500).json({ error: 'Server error during Google login' });
    }
};
exports.googleLogin = googleLogin;
const anonymousLogin = async (req, res) => {
    try {
        const anonymousId = crypto_1.default.randomBytes(8).toString('hex');
        const email = `anon_${anonymousId}@mindbridge.guest`;
        const user = await prisma_1.default.user.create({
            data: {
                email,
                displayName: "Guest User",
                isAnonymous: true,
                isVerified: true
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, isAnonymous: true }, JWT_SECRET, { expiresIn: '1d' });
        res.json({
            user: {
                ...user,
                onboardingStep: user.onboardingStep,
                onboardingCompleted: user.onboardingCompleted
            },
            token
        });
    }
    catch (error) {
        console.error('DETAILED ANONYMOUS LOGIN ERROR:', error);
        res.status(500).json({ error: 'Server error during anonymous login' });
    }
};
exports.anonymousLogin = anonymousLogin;
const resendVerification = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.isVerified) {
            return res.status(400).json({ error: 'Email already verified' });
        }
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        await prisma_1.default.user.update({
            where: { id: user.id },
            data: { verificationToken }
        });
        await (0, emailService_1.sendVerificationEmail)(email, verificationToken);
        res.json({ message: 'Verification email resent successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during resending verification' });
    }
};
exports.resendVerification = resendVerification;
const verifyEmail = async (req, res) => {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing token' });
    }
    try {
        const user = await prisma_1.default.user.findFirst({
            where: { verificationToken: token }
        });
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }
        await prisma_1.default.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null
            }
        });
        res.json({ message: 'Email verified successfully! You can now log in.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during verification' });
    }
};
exports.verifyEmail = verifyEmail;
const getMe = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ error: 'Not authenticated' });
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.userId },
            include: { assessments: true }
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json({
            ...user,
            onboardingStep: user.onboardingStep,
            onboardingCompleted: user.onboardingCompleted
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching profile' });
    }
};
exports.getMe = getMe;
const updateProfile = async (req, res) => {
    const { name, institution, studentId, course, phoneNumber } = req.body;
    try {
        if (!req.user)
            return res.status(401).json({ error: 'Not authenticated' });
        // Basic server-side validation
        if (phoneNumber && !/^\+?[\d\s-]{8,20}$/.test(phoneNumber)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }
        if (name && name.length > 100) {
            return res.status(400).json({ error: 'Name is too long' });
        }
        const user = await prisma_1.default.user.update({
            where: { id: req.userId },
            data: {
                displayName: name,
                university: institution ? mapInstitutionToUniversity(institution) : undefined,
                studentId,
                program: course,
                phoneNumber
            }
        });
        res.json({
            ...user,
            onboardingStep: user.onboardingStep,
            onboardingCompleted: user.onboardingCompleted
        });
    }
    catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ error: 'Server error updating profile' });
    }
};
exports.updateProfile = updateProfile;
const uploadAvatar = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ error: 'Not authenticated' });
        if (!req.file)
            return res.status(400).json({ error: 'No file uploaded' });
        const imageUrl = `/uploads/avatars/${req.file.filename}`;
        const user = await prisma_1.default.user.update({
            where: { id: req.userId },
            data: { image: imageUrl }
        });
        res.json({
            user: {
                ...user,
                onboardingStep: user.onboardingStep,
                onboardingCompleted: user.onboardingCompleted
            },
            imageUrl
        });
    }
    catch (error) {
        console.error('Avatar Upload Error:', error);
        res.status(500).json({ error: 'Server error during avatar upload' });
    }
};
exports.uploadAvatar = uploadAvatar;
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        if (!req.user)
            return res.status(401).json({ error: 'Not authenticated' });
        const user = await prisma_1.default.user.findUnique({ where: { id: req.userId } });
        if (!user || !user.password)
            return res.status(404).json({ error: 'User not found' });
        const isMatch = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect current password' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await prisma_1.default.user.update({
            where: { id: req.userId },
            data: { password: hashedPassword }
        });
        res.json({ message: 'Password updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error changing password' });
    }
};
exports.changePassword = changePassword;
const verifyToken = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ error: 'Invalid or expired token' });
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.userId }
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json({
            user: {
                ...user,
                onboardingStep: user.onboardingStep,
                onboardingCompleted: user.onboardingCompleted
            },
            token: req.header('Authorization')?.split(' ')[1]
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Token verification failed' });
    }
};
exports.verifyToken = verifyToken;
const mapInstitutionToUniversity = (institution) => {
    if (!institution)
        return 'OTHER';
    const inst = institution.toLowerCase();
    if (inst.includes('knust'))
        return 'KNUST';
    if (inst.includes('university of ghana') || inst.includes('legon'))
        return 'UNIVERSITY_OF_GHANA';
    if (inst.includes('cape coast') || inst.includes('ucc'))
        return 'UNIVERSITY_OF_CAPE_COAST';
    if (inst.includes('ashesi'))
        return 'ASHESI_UNIVERSITY';
    if (inst.includes('gimpa'))
        return 'GIMPA';
    return 'OTHER';
};
//# sourceMappingURL=authController.js.map