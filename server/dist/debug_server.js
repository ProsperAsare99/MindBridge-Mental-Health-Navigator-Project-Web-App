"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Simple server is running!' });
});
app.post('/api/auth/login', (req, res) => {
    console.log('Mock login request received');
    res.json({
        token: 'mock_token_for_debugging',
        user: {
            id: 'mock-id',
            email: req.body.email || 'mock@test.com',
            name: 'Mock Debug User'
        }
    });
});
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Simple debug server running on port ${PORT}`);
});
//# sourceMappingURL=debug_server.js.map