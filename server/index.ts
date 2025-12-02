import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectsRouter from './routes/projects';
import feedbackRouter from './routes/feedback';
import contactRouter from './routes/contact';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import settingsRouter from './routes/settings';
import uploadRouter from './routes/upload';

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

import { db } from './db';

app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

app.get('/api/health', async (_req, res) => {
    try {
        await db.$connect();
        const userCount = await db.user.count();
        res.json({
            status: 'ok',
            db: 'connected',
            userCount,
            env: process.env.NODE_ENV,
            mongoDbUrl: process.env.DATABASE_URL ? 'Set' : 'Missing'
        });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({
            status: 'error',
            db: 'disconnected',
            error: (error as Error).message,
            stack: (error as Error).stack
        });
    }
});

app.use('/api/projects', projectsRouter as any);
app.use('/api/feedback', feedbackRouter as any);
app.use('/api/contact', contactRouter as any);
app.use('/api/auth', authRouter as any);
app.use('/api/users', usersRouter as any);
app.use('/api/settings', settingsRouter as any);
app.use('/api/upload', uploadRouter as any);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found', path: req.path, originalUrl: req.originalUrl });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Only start the server if we're not in a Netlify function environment
if (!process.env.NETLIFY) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
