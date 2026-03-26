import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { initializeCircles } from './controllers/socialController';
import { initializeChallenges } from './controllers/gamificationController';

const PORT = parseInt(process.env.PORT || '5000');

// Server entry point - Syncing innovative features.
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    
    // Background initialization - don't block the server startup
    console.log(`[SERVER] Initializing background tasks...`);
    initializeCircles().catch((error: any) => {
        console.warn('[SERVER WARNING] Circles initialization failed:', error.message);
    });
    initializeChallenges().catch((error: any) => {
        console.warn('[SERVER WARNING] Challenges initialization failed:', error.message);
    });
});

