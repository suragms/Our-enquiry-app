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
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', path: req.path, originalUrl: req.originalUrl, env: process.env.NODE_ENV });
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

// Only start the server if we're not in a Netlify function environment
if (!process.env.NETLIFY) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
