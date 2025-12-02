import serverless from 'serverless-http';
import { Handler } from '@netlify/functions';
import { app } from '../../server/index';

// Ensure Prisma client is initialized for serverless environment
process.env.NETLIFY = 'true';

// Create the serverless handler with proper configuration
const serverlessHandler = serverless(app, {
    binary: ['image/*', 'application/pdf', 'video/*'],
});

// Export the handler with error handling
export const handler: Handler = async (event, context) => {
    // Prevent function timeout
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        console.log('=== Netlify Function Invoked ===');
        console.log('Path:', event.path);
        console.log('Method:', event.httpMethod);
        console.log('Headers:', JSON.stringify(event.headers));

        // Call the serverless handler
        const result = await serverlessHandler(event, context);

        console.log('Function completed successfully');
        return result;
    } catch (error) {
        console.error('=== Function Error ===');
        console.error('Error type:', error?.constructor?.name);
        console.error('Error message:', (error as Error).message);
        console.error('Error stack:', (error as Error).stack);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                error: 'Internal Server Error',
                message: (error as Error).message,
                type: error?.constructor?.name,
                path: event.path,
            }),
        };
    }
};
