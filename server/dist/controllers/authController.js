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
const register = async (req, res) => {
    const { email, password, name, institution, studentId, course, phoneNumber } = req.body;
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
                name,
                institution,
                studentId,
                course,
                phoneNumber,
                isVerified: true
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ user, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
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
        res.json({ user, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login' });
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
                    name,
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
        res.json({ user, token });
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
                name: "Guest User",
                isAnonymous: true,
                isVerified: true
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, isAnonymous: true }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ user, token });
    }
    catch (error) {
        console.error('Anonymous Login Error:', error);
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
            where: { id: req.user.userId },
            include: { assessments: true }
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json(user);
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
            where: { id: req.user.userId },
            data: {
                name,
                institution,
                studentId,
                course,
                phoneNumber
            }
        });
        res.json(user);
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
            where: { id: req.user.userId },
            data: { image: imageUrl }
        });
        res.json({ user, imageUrl });
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
        const user = await prisma_1.default.user.findUnique({ where: { id: req.user.userId } });
        if (!user || !user.password)
            return res.status(404).json({ error: 'User not found' });
        const isMatch = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect current password' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await prisma_1.default.user.update({
            where: { id: req.user.userId },
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
            where: { id: req.user.userId }
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json({ user, token: req.header('Authorization')?.split(' ')[1] });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Token verification failed' });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authController.js.map