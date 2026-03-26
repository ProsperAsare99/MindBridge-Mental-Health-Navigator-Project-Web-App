"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrisma = void 0;
let _prisma = null;
const createPrismaClient = () => {
    const { PrismaClient } = require('@prisma/client');
    return new PrismaClient({
        log: ['error', 'warn']
    });
};
const prismaProxy = new Proxy({}, {
    get: (target, prop) => {
        if (!_prisma) {
            console.log('[PRISMA] Lazy instantiating PrismaClient...');
            _prisma = createPrismaClient();
        }
        return _prisma[prop];
    }
});
exports.default = prismaProxy;
const getPrisma = () => {
    if (!_prisma) {
        console.log('[PRISMA] Lazy instantiating PrismaClient...');
        _prisma = createPrismaClient();
    }
    return _prisma;
};
exports.getPrisma = getPrisma;
//# sourceMappingURL=prisma.js.map