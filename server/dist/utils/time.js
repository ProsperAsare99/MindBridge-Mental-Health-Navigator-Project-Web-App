"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeContext = exports.isHighStressPeriod = void 0;
/**
 * Determines if the current date falls within a statistically high-stress period
 * for university students (e.g., Midterms or Final Exams).
 *
 * Mock Logic: March (Finals/Midterms) and April (Finals) are high-stress.
 */
const isHighStressPeriod = () => {
    const now = new Date();
    const month = now.getMonth(); // 0-indexed: 2 is March, 3 is April
    return month === 2 || month === 3;
};
exports.isHighStressPeriod = isHighStressPeriod;
/**
 * Formats the current system time into a human-readable context string.
 */
const getTimeContext = () => {
    return new Date().toLocaleString('en-US', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric'
    });
};
exports.getTimeContext = getTimeContext;
//# sourceMappingURL=time.js.map