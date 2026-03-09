import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log('Root Prisma Models:');
console.log(Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')));
prisma.$disconnect();
