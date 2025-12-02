import serverless from 'serverless-http';
import { app } from '../../server/index';

// Ensure Prisma client is initialized for serverless environment
process.env.NETLIFY = 'true';

export const handler = serverless(app, {
    // Ensure binary data is handled correctly
    binary: ['image/*', 'application/pdf', 'video/*'],
});
