"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_for_development';
if (JWT_SECRET === 'your_fallback_secret_for_development') {
    console.warn('[AUTH WARNING] JWT_SECRET is using the fallback value. This will cause authentication failures if NextAuth is using a different secret.');
}
else {
    console.log('[AUTH INFO] JWT_SECRET loaded from environment.');
}
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Find user to verify they still exist
        const user = await prisma_1.default.user.findUnique({
            where: { id: decoded.userId }
        });
        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }
        // Update last active
        await prisma_1.default.user.update({
            where: { id: user.id },
            data: { lastActive: new Date() }
        });
        req.user = user;
        req.userId = user.id;
        next();
    }
    catch (error) {
        console.error('Authentication Error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired.' });
        }
        res.status(500).json({
            error: `Authentication process failed: ${error.message}`,
            details: error.message
        });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.js.map