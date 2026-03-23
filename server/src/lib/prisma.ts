import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client_new';

const createPrismaClient = () => {
    const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_hvrlmMH2nBe7@ep-cold-art-al16we8v.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require&connection_limit=1";
    
    console.log(`[STABILITY FIX] Initializing Prisma with PG Driver Adapter...`);
    
    const pool = new Pool({ 
        connectionString: connectionString.replace(/connection_limit=\d+/, 'connection_limit=10'),
        max: 10, // Increased to handle concurrent dashboard widgets
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 30000,
        keepAlive: true
    });

    pool.on('error', (err) => {
        console.error('[PRISMA POOL ERROR]', err.message);
    });
    
    const adapter = new PrismaPg(pool);
    
    const client = new PrismaClient({ 
        adapter,
        log: ['error', 'warn']
    });

    return client;
};

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
