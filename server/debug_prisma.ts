import { PrismaClient } from './src/generated/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Testing Prisma connection...');
    try {
        const users = await prisma.user.findMany({ select: { id: true, email: true } });
        console.log('Users in DB:', users);

        const moodCount = await prisma.mood.count();
        console.log('Mood count:', moodCount);

        const chatCount = await prisma.chatMessage.count();
        console.log('ChatMessage count:', chatCount);
    } catch (error: any) {
        console.error('Prisma Error:');
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        if (error.meta) console.error('Meta:', error.meta);
    } finally {
        await prisma.$disconnect();
    }
}

main();
