const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

import app from './app';
import { initializeCircles } from './controllers/socialController';
import { initializeChallenges } from './controllers/gamificationController';

const PORT = Number(process.env.PORT) || 5000;
const HOST = '0.0.0.0';

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
