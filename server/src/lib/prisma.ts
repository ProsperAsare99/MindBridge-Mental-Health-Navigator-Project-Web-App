import type { PrismaClient as PrismaClientType } from '@prisma/client';

let _prisma: PrismaClientType | null = null;

const createPrismaClient = (): PrismaClientType => {
    const { PrismaClient } = require('@prisma/client');
    return new PrismaClient({
        log: ['error', 'warn']
    });
};

const prismaProxy = new Proxy({} as PrismaClientType, {
    get: (target, prop) => {
        if (!_prisma) {
            console.log('[PRISMA] Lazy instantiating PrismaClient...');
            _prisma = createPrismaClient();
        }
        return ( _prisma as any)[prop];
    }
});

export default prismaProxy;

export const getPrisma = (): PrismaClientType => {
    if (!_prisma) {
        console.log('[PRISMA] Lazy instantiating PrismaClient...');
        _prisma = createPrismaClient();
    }
    return _prisma;
};
