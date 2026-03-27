import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import assessmentRoutes from './routes/assessmentRoutes';
import moodRoutes from './routes/moodRoutes';
import userRoutes from './routes/userRoutes';
import academicRoutes from './routes/academicRoutes';
import onboardingRoutes from './routes/onboardingRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import gamificationRoutes from './routes/gamificationRoutes';
import socialRoutes from './routes/socialRoutes';
import resourceRoutes from './routes/resourceRoutes';
import crisisRoutes from './routes/crisisRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[SERVER] ${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/users', userRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/crisis', crisisRoutes);


app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Catch-all 404 for debugging
app.use((req, res) => {
    console.warn(`[SERVER 404] No route found for: ${req.method} ${req.url}`);
    res.status(404).json({ error: `Path not found: ${req.method} ${req.url}` });
});

export default app;
