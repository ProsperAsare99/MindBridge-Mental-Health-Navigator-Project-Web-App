const { PrismaClient } = require('./prisma/generated/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const fs = require('fs');

async function run() {
    let output = "";
    const log = (msg) => {
        console.log(msg);
        output += msg + "\n";
    };

    try {
        const user = await prisma.user.findUnique({
            where: { email: 'asareprosper143@gmail.com' }
        });
        
        if (!user) {
            log("User not found");
            return;
        }

        log(`STREAK RECOVERY FOR: ${user.email} (${user.id})`);

        // Check ALL mood entries
        const moods = await prisma.moodEntry.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        });

        log(`Total Mood Entries Found: ${moods.length}`);
        moods.forEach(m => {
            log(`  - ${m.createdAt.toISOString()}: Mood ${m.mood}`);
        });

        // Check ALL usage logs
        const logs = await prisma.usageLog.findMany({
            where: { userId: user.id },
            orderBy: { timestamp: 'desc' }
        });

        log(`Total Usage Logs Found: ${logs.length}`);
        logs.forEach(l => {
            log(`  - ${l.timestamp.toISOString()}: Service=${l.service}, Model=${l.model}`);
        });

        fs.writeFileSync('recovery_diag.txt', output);
        console.log("Recovery diag saved");

    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

run();
