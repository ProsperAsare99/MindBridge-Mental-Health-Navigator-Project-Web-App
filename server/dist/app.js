import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import assessmentRoutes from './routes/assessmentRoutes';
const app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assessments', assessmentRoutes);
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
export default app;
//# sourceMappingURL=app.js.map