// Bootstrap script using jiti for robust ESM/CJS interop
const jiti = require('jiti')(__filename);
console.log('[BOOT] Starting server with jiti...');

try {
    // Import the main entry point
    jiti('./src/index.ts');
} catch (error) {
    console.error('[BOOT] Failed to start server:', error);
    process.exit(1);
}
