import serverless from 'serverless-http';
import { Handler } from '@netlify/functions';
import { app } from '../../server/index';
import { db } from '../../server/db';

// Ensure Prisma client is initialized for serverless environment
process.env.NETLIFY = 'true';

// Create the serverless handler
const serverlessHandler = serverless(app, {
    // Ensure binary data is handled correctly
    binary: ['image/*', 'application/pdf', 'video/*'],
});

// Wrap with error handling and connection management
export const handler: Handler = async (event, context) => {
    try {
        console.log('Function invoked:', event.path, event.httpMethod);

        // Ensure database connection is ready
        await db.$connect();
        console.log('Database connected successfully');

        // Call the serverless handler
        const result = await serverlessHandler(event, context);

        return result;
    } catch (error) {
        console.error('Function error:', error);
        console.error('Error stack:', (error as Error).stack);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                error: 'Internal Server Error',
                message: (error as Error).message,
                details: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
            }),
        };
    } finally {
        // Don't disconnect in serverless - let connection pool handle it
        // await db.$disconnect();
    }
};
