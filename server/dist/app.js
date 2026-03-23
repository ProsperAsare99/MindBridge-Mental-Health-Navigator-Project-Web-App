"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const assessmentRoutes_1 = __importDefault(require("./routes/assessmentRoutes"));
const moodRoutes_1 = __importDefault(require("./routes/moodRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const academicRoutes_1 = __importDefault(require("./routes/academicRoutes"));
const onboardingRoutes_1 = __importDefault(require("./routes/onboardingRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
const gamificationRoutes_1 = __importDefault(require("./routes/gamificationRoutes"));
const socialRoutes_1 = __importDefault(require("./routes/socialRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/assessments', assessmentRoutes_1.default);
app.use('/api/moods', moodRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/academic', academicRoutes_1.default);
app.use('/api/onboarding', onboardingRoutes_1.default);
app.use('/api/analytics', analyticsRoutes_1.default);
app.use('/api/gamification', gamificationRoutes_1.default);
app.use('/api/social', socialRoutes_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
exports.default = app;
//# sourceMappingURL=app.js.map