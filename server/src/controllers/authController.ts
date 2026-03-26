import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth';
import { sendVerificationEmail } from '../utils/emailService';
import { OAuth2Client } from 'google-auth-library';
import type { University } from '@prisma/client';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_for_development';

if (JWT_SECRET === 'your_fallback_secret_for_development') {
    console.warn('[AUTH CONTROLLER WARNING] JWT_SECRET is using the fallback value.');
} else {
    console.log('[AUTH CONTROLLER INFO] JWT_SECRET loaded from environment.');
}

export const register = async (req: Request, res: Response) => {
    const { email, password, name, institution, studentId, course, phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    // Basic format validation
    if (!/^\+?[\d\s-]{8,20}$/.test(phoneNumber)) {
        return res.status(400).json({ error: 'Invalid phone number format' });
    }

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
                displayName: name,
                university: mapInstitutionToUniversity(institution),
                studentId,
                program: course,
                phoneNumber,
                isVerified: true
            }
        });

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ 
            user: {
                ...user,
                onboardingStep: (user as any).onboardingStep,
                onboardingCompleted: (user as any).onboardingCompleted
            }, 
            token 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(`[AUTH] Login attempt received for: ${email}`);

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

        res.json({ 
            user: {
                ...user,
                onboardingStep: (user as any).onboardingStep,
                onboardingCompleted: (user as any).onboardingCompleted
            }, 
            token 
        });
    } catch (error: any) {
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
                    displayName: name,
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

        res.json({ 
            user: {
                ...user,
                onboardingStep: (user as any).onboardingStep,
                onboardingCompleted: (user as any).onboardingCompleted
            }, 
            token 
        });
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
                displayName: "Guest User",
                isAnonymous: true,
                isVerified: true
            }
        });

        const token = jwt.sign({ userId: user.id, email: user.email, isAnonymous: true }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ 
            user: {
                ...user,
                onboardingStep: (user as any).onboardingStep,
                onboardingCompleted: (user as any).onboardingCompleted
            }, 
            token 
        });
    } catch (error) {
        console.error('DETAILED ANONYMOUS LOGIN ERROR:', error);
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
            where: { id: req.userId },
            include: { assessments: true }
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({
            ...user,
            onboardingStep: (user as any).onboardingStep,
            onboardingCompleted: (user as any).onboardingCompleted
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching profile' });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
    const { name, institution, studentId, course, phoneNumber } = req.body;

    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        // Basic server-side validation
        if (phoneNumber && !/^\+?[\d\s-]{8,20}$/.test(phoneNumber)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        if (name && name.length > 100) {
            return res.status(400).json({ error: 'Name is too long' });
        }

        const user = await prisma.user.update({
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
            onboardingStep: (user as any).onboardingStep,
            onboardingCompleted: (user as any).onboardingCompleted
        });
    } catch (error: any) {
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
            where: { id: req.userId },
            data: { image: imageUrl }
        });

        res.json({ 
            user: {
                ...user,
                onboardingStep: (user as any).onboardingStep,
                onboardingCompleted: (user as any).onboardingCompleted
            }, 
            imageUrl 
        });
    } catch (error) {
        console.error('Avatar Upload Error:', error);
        res.status(500).json({ error: 'Server error during avatar upload' });
    }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;

    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user || !user.password) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: req.userId },
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
            where: { id: req.userId }
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ 
            user: {
                ...user,
                onboardingStep: (user as any).onboardingStep,
                onboardingCompleted: (user as any).onboardingCompleted
            }, 
            token: req.header('Authorization')?.split(' ')[1] 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Token verification failed' });
    }
};

const mapInstitutionToUniversity = (institution: string): any => {
    if (!institution) return 'OTHER';
    
    const inst = institution.toLowerCase();
    
    if (inst.includes('knust')) return 'KNUST';
    if (inst.includes('university of ghana') || inst.includes('legon')) return 'UNIVERSITY_OF_GHANA';
    if (inst.includes('cape coast') || inst.includes('ucc')) return 'UNIVERSITY_OF_CAPE_COAST';
    if (inst.includes('ashesi')) return 'ASHESI_UNIVERSITY';
    if (inst.includes('gimpa')) return 'GIMPA';
    
    return 'OTHER';
};
