import type { PrismaClient as PrismaClientType } from '@prisma/client';
declare const prismaProxy: PrismaClientType<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export default prismaProxy;
export declare const getPrisma: () => PrismaClientType;
