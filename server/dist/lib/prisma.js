"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_new_1 = require("../generated/client_new");
const createPrismaClient = () => {
    const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_hvrlmMH2nBe7@ep-cold-art-al16we8v.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=verify-full&connection_limit=1";
    console.log(`[STABILITY FIX] Initializing Prisma with PG Driver Adapter...`);
    const pool = new pg_1.Pool({
        connectionString: connectionString
            .replace(/connection_limit=\d+/, 'connection_limit=10')
            .replace(/sslmode=[^&]+/, 'sslmode=verify-full'),
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 30000,
        keepAlive: true
    });
    pool.on('error', (err) => {
        console.error('[PRISMA POOL ERROR]', err.message);
    });
    const adapter = new adapter_pg_1.PrismaPg(pool);
    const client = new client_new_1.PrismaClient({
        adapter,
        log: ['error', 'warn']
    });
    return client;
};
const globalForPrisma = global;
exports.prisma = globalForPrisma.prisma || createPrismaClient();
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
exports.default = exports.prisma;
//# sourceMappingURL=prisma.js.map