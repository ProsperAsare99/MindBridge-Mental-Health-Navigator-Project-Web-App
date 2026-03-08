import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_for_development';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(0o1).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(0o3).json({ error: 'Invalid token.' });
    }
};
