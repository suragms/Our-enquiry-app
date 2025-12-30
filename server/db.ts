import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Configure Prisma for serverless environment
const prismaClientOptions = {
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] as const : ['error'] as const,
    // Optimize for serverless with connection pooling
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
};

// Create a singleton instance
export const db =
    globalForPrisma.prisma ??
    new PrismaClient(prismaClientOptions as any);

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = db;
}

// Handle serverless connection management
if (process.env.NETLIFY || process.env.VERCEL) {
    console.log('Running in serverless environment');
    console.log('DATABASE_URL configured:', process.env.DATABASE_URL ? 'Yes' : 'No');
}
