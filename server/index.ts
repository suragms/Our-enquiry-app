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

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectsRouter as any);
app.use('/api/feedback', feedbackRouter as any);
app.use('/api/contact', contactRouter as any);
app.use('/api/auth', authRouter as any);
app.use('/api/users', usersRouter as any);
app.use('/api/settings', settingsRouter as any);
app.use('/api/upload', uploadRouter as any);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
