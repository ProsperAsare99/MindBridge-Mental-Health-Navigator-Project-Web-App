import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { initializeCircles } from './controllers/socialController';
import { initializeChallenges } from './controllers/gamificationController';

console.log('[DEBUG] Imports complete');

const PORT = parseInt(process.env.PORT || '5000');

// Server entry point - Syncing innovative features.
const HOST = '0.0.0.0';
console.log(`[DEBUG] Attempting to listen on ${HOST}:${PORT}...`);
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    
    // Background initialization disabled to prevent exit on network errors
    console.log(`[SERVER] Background tasks disabled for stability.`);
    /*
    initializeCircles().catch((error: any) => {
        console.warn('[SERVER WARNING] Circles initialization failed:', error.message);
    });
    initializeChallenges().catch((error: any) => {
        console.warn('[SERVER WARNING] Challenges initialization failed:', error.message);
    });
    */
});

