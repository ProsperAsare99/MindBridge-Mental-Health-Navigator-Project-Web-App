import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[PRISMA TEST] Starting connection test...');
  try {
    // Run a simple query
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log('[PRISMA TEST] Success:', result);
  } catch (error: any) {
    console.error('[PRISMA TEST] Failure:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
