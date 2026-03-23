"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = exports.loginLimiter = exports.aiChatLimiter = exports.generalLimiter = void 0;
/**
 * Rate limiting has been completely disabled as requested.
 * All limiters are now transparent pass-through middlewares.
 */
const noopMiddleware = (req, res, next) => next();
exports.generalLimiter = noopMiddleware;
exports.aiChatLimiter = noopMiddleware;
exports.loginLimiter = noopMiddleware;
exports.rateLimiter = noopMiddleware;
exports.default = exports.rateLimiter;
//# sourceMappingURL=rate-limit.js.map