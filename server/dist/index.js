"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
console.log('[DEBUG] Imports complete');
const PORT = parseInt(process.env.PORT || '5000');
// Server entry point - Syncing innovative features.
const HOST = '0.0.0.0';
console.log(`[DEBUG] Attempting to listen on ${HOST}:${PORT}...`);
app_1.default.listen(PORT, HOST, () => {
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
//# sourceMappingURL=index.js.map