import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendVerificationEmail } from '../utils/emailService';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_for_development';

export const register = async (req: Request, res: Response) => {
    const { email, password, name, institution, studentId, course, phoneNumber } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const user = await prisma.user.create({
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

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Auto-verify user if they are not already
        if (!user.isVerified) {
            user = await prisma.user.update({
                where: { id: user.id },
                data: { isVerified: true }
            });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login' });
    }
};

export const googleLogin = async (req: Request, res: Response) => {
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
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { googleId },
                    { email }
                ]
            }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    googleId,
                    name,
                    isVerified: true, // Google emails are already verified
                }
            });
        } else {
            // Ensure google user is verified and googleId is linked
            if (!user.isVerified || !user.googleId) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { googleId, isVerified: true }
                });
            }
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ user, token });
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(500).json({ error: 'Server error during Google login' });
    }
};

export const anonymousLogin = async (req: Request, res: Response) => {
    try {
        const anonymousId = crypto.randomBytes(8).toString('hex');
        const email = `anon_${anonymousId}@mindbridge.guest`;

        const user = await prisma.user.create({
            data: {
                email,
                name: "Guest User",
                isAnonymous: true,
                isVerified: true
            }
        });

        const token = jwt.sign({ userId: user.id, email: user.email, isAnonymous: true }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ user, token });
    } catch (error) {
        console.error('Anonymous Login Error:', error);
        res.status(500).json({ error: 'Server error during anonymous login' });
    }
};

export const resendVerification = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ error: 'Email already verified' });
        }

        const verificationToken = crypto.randomBytes(32).toString('hex');
        await prisma.user.update({
            where: { id: user.id },
            data: { verificationToken }
        });

        await sendVerificationEmail(email, verificationToken);
        res.json({ message: 'Verification email resent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during resending verification' });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing token' });
    }

    try {
        const user = await prisma.user.findFirst({
            where: { verificationToken: token }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null
            }
        });

        res.json({ message: 'Email verified successfully! You can now log in.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during verification' });
    }
};

export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            include: { assessments: true }
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching profile' });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
    const { name, institution, studentId, course, phoneNumber } = req.body;

    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const user = await prisma.user.update({
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
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ error: 'Server error updating profile' });
    }
};

export const uploadAvatar = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const imageUrl = `/uploads/avatars/${req.file.filename}`;

        const user = await prisma.user.update({
            where: { id: req.user.userId },
            data: { image: imageUrl }
        });

        res.json({ user, imageUrl });
    } catch (error) {
        console.error('Avatar Upload Error:', error);
        res.status(500).json({ error: 'Server error during avatar upload' });
    }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;

    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
        if (!user || !user.password) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: req.user.userId },
            data: { password: hashedPassword }
        });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error changing password' });
    }
};

export const verifyToken = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Invalid or expired token' });

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId }
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ user, token: req.header('Authorization')?.split(' ')[1] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Token verification failed' });
    }
};
