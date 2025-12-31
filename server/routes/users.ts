import express from 'express';
import { db } from '../db';

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const users = await db.user.findMany({
            select: { id: true, name: true, email: true, role: true }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

export default router;
