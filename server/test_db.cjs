const { getPrisma } = require('./src/lib/prisma');
console.log('Using DATABASE_URL:', process.env.DATABASE_URL ? 'FOUND' : 'MISSING');
const prisma = getPrisma();

async function test() {
    try {
        const users = await prisma.user.findMany();
        console.log('Users found:', users.length);
        process.exit(0);
    } catch (err) {
        console.error('Error during test:', err);
        process.exit(1);
    }
}

test();
