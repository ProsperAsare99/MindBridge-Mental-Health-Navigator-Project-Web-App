import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

export const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret === 'your_fallback_secret_for_development') {
        // Only warn once
        if (!(global as any).__jwt_warned) {
            console.warn('[AUTH WARNING] JWT_SECRET is missing or using fallback. Checking environment synchronization...');
            (global as any).__jwt_warned = true;
        }
        return 'your_fallback_secret_for_development';
    }
    return secret;
};

export interface AuthRequest extends Request {
    user?: any;
    userId?: string;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, getJwtSecret()) as { userId: string; email: string };
        
        // Find user to verify they still exist
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }

        // Update last active
        await prisma.user.update({
            where: { id: user.id },
            data: { lastActive: new Date() }
        });

        req.user = user;
        req.userId = user.id;
        next();
    } catch (error: any) {
        // Detailed error logging for stability monitoring
        console.error(`[AUTH FAILURE] ${new Date().toISOString()}:`, {
            name: error.name,
            message: error.message,
            code: error.code,
            stack: error.stack?.split('\n')[1] // Just the first line of trace
        });
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired.' });
        }

        // Handle Database connection issues specifically (Prisma codes or Node network codes)
        const isDbError = 
            error.code?.startsWith('P') || 
            error.code === 'ENOTFOUND' || 
            error.code === 'EAI_AGAIN' ||
            error.message?.includes('ECONNRESET') ||
            error.message?.includes('ENOTFOUND');

        if (isDbError) {
            return res.status(503).json({ 
                error: 'Service temporarily unavailable due to database connectivity. Please try again in a moment.',
                details: 'DB_CONNECTION_FAILURE'
            });
        }
        
        res.status(500).json({ 
            error: `Authentication process failed: ${error.message}`, 
            details: error.message 
        });
    }
};
