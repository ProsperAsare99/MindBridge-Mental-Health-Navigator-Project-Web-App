import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client_new';

const createPrismaClient = () => {
    const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_hvrlmMH2nBe7@ep-cold-art-al16we8v.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=verify-full&connection_limit=1";
    
    console.log(`[STABILITY FIX] Initializing Prisma with PG Driver Adapter...`);
    
    const pool = new Pool({ 
        connectionString: connectionString
            .replace(/connection_limit=\d+/, 'connection_limit=10')
            .replace(/sslmode=[^&]+/, 'sslmode=verify-full'),
        max: 10,
        idleTimeoutMillis: 10000, // Reduced from 30s to 10s to avoid stale connections
        connectionTimeoutMillis: 15000,
        keepAlive: true
    });

    pool.on('error', (err) => {
        console.error('[PRISMA POOL ERROR]', err.message);
    });
    
    const adapter = new PrismaPg(pool);
    
    // Base client
    const client = new PrismaClient({ 
        adapter,
        log: ['error', 'warn']
    });

    // Stability Extension: Automatic Retries for transient connection errors
    return client.$extends({
        query: {
            $allOperations: async ({ model, operation, args, query }) => {
                let retries = 3;
                while (retries > 0) {
                    try {
                        return await query(args);
                    } catch (error: any) {
                        const isTransient = 
                            error.message?.includes('ECONNRESET') || 
                            error.message?.includes('ETIMEDOUT') ||
                            error.code === 'P1001' ||
                            error.code === 'P1017'; // Server closed the connection

                        if (isTransient && retries > 1) {
                            retries--;
                            const delay = (3 - retries) * 1000;
                            console.warn(`[PRISMA RETRY] ${operation} on ${model} failed (Transient: ${error.message}). Retrying in ${delay}ms... (${retries} retries left)`);
                            await new Promise(resolve => setTimeout(resolve, delay));
                            continue;
                        }
                        throw error;
                    }
                }
            },
        },
    }) as unknown as PrismaClient;
};

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
