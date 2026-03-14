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
const aiRoutes_1 = __importDefault(require("./routes/aiRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/assessments', assessmentRoutes_1.default);
app.use('/api/moods', moodRoutes_1.default);
app.use('/api/ai', aiRoutes_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
exports.default = app;
//# sourceMappingURL=app.js.map