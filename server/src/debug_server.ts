import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

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
