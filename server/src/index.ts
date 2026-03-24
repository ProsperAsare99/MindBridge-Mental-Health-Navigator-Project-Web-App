import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { initializeCircles } from './controllers/socialController';

const PORT = parseInt(process.env.PORT || '5000');

// Server entry point - Syncing innovative features.
const HOST = '0.0.0.0';
app.listen(PORT, HOST, async () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    await initializeCircles();
});

