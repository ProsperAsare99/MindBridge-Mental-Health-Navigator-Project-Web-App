"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const app_1 = __importDefault(require("./app"));
const PORT = Number(process.env.PORT) || 5000;
const HOST = '0.0.0.0';
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