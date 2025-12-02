import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Configure Prisma for serverless environment
const prismaClientOptions = {
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // Optimize for serverless with connection pooling
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
};

export const db =
    globalForPrisma.prisma ??
    new PrismaClient(prismaClientOptions as any);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// Handle serverless connection cleanup
if (process.env.NETLIFY) {
    // In serverless environments, ensure connections are properly managed
    db.$connect().catch((err) => {
        console.error('Failed to connect to database:', err);
    });
}
