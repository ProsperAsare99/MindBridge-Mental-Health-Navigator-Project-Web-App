// Patch to prevent diagnostics_channel crash in Node 22 + Prisma
const dc = require('node:diagnostics_channel');

// Early patch to trap problematic internal Node 22 tracing
try {
    const originalSubscribe = dc.subscribe;
    dc.subscribe = function(name, callback) {
        if (name.includes('prisma') || name.includes('http') || name.includes('net')) {
            // Silently ignore or safely wrap the subscription if needed
            // For now, we allow it but wrap in a try-catch to prevent traceSync crashes
            return originalSubscribe.call(this, name, (...args) => {
                try {
                    callback(...args);
                } catch (e) {
                    // Ignore tracing errors to prevent server crash
                }
            });
        }
        return originalSubscribe.call(this, name, callback);
    };
    console.log('[STABILITY PATCH] diagnostics_channel protection active');
} catch (e) {
    console.error('[STABILITY PATCH] Failed to apply patch:', e);
}
