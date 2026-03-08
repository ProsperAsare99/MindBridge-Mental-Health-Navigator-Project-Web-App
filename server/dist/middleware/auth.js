import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_for_development';
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ error: 'Invalid token.' });
    }
};
//# sourceMappingURL=auth.js.map