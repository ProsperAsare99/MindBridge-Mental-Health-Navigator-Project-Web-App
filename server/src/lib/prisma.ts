import type { PrismaClient as PrismaClientType } from '../generated/client';

let _prisma: PrismaClientType | null = null;

const createPrismaClient = (): PrismaClientType => {
    const { PrismaClient } = require('../generated/client');
    const { Pool } = require('pg');
    const { PrismaPg } = require('@prisma/adapter-pg');
    
    // Configure pool for Neon compatibility
    const pool = new Pool({ 
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // Necessary for Neon depending on environment
        }
    });
    
    const adapter = new PrismaPg(pool);
    return new PrismaClient({
        adapter,
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

export const getPrisma = (): PrismaClientType => {
    if (!_prisma) {
        console.log('[PRISMA] Lazy instantiating PrismaClient...');
        _prisma = createPrismaClient();
    }
    return _prisma;
};

export const testConnection = async (): Promise<boolean> => {
    const client = getPrisma();
    try {
        // Simple query to verify connection
        await client.$queryRaw`SELECT 1`;
        console.log('[PRISMA] Database connection successful.');
        return true;
    } catch (error: any) {
        console.error('[PRISMA ERROR] Database connection failed:', {
            message: error.message,
            code: error.code,
            meta: error.meta
        });
        return false;
    }
};

export default prismaProxy;
