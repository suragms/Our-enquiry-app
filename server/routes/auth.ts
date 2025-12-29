import express from 'express';
import { authenticateUser, createUser, generateToken } from '../utils/auth';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        console.log('=== Login Request Started ===');
        console.log('Request body:', { email: req.body.email, hasPassword: !!req.body.password });

        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Login failed: Missing email or password');
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        console.log('Attempting to authenticate user:', email);
        const user = await authenticateUser(email, password);

        if (!user) {
            console.log('Login failed: Invalid credentials for', email);
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        console.log('Login successful for:', email, 'Role:', user.role);
        const token = generateToken(user.id, user.role);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
        console.error('=== Login Error ===');
        console.error('Error type:', error?.constructor?.name);
        console.error('Error message:', (error as Error).message);
        console.error('Error stack:', (error as Error).stack);

        res.status(500).json({
            error: 'Login failed',
            details: (error as Error).message,
            type: error?.constructor?.name
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const user = await createUser(email, password, name, role);
        const token = generateToken(user.id, user.role);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

export default router;
