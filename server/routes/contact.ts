import express from 'express';
import { db } from '../db';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, requirement } = req.body;

        if (!name || !email || !requirement) {
            return res.status(400).send('Missing required fields');
        }

        const message = await db.contactMessage.create({
            data: {
                name,
                email,
                phone,
                requirement,
            },
        });

        res.json(message);
    } catch (error) {
        console.error('[CONTACT_POST]', error);
        res.status(500).send('Internal Error');
    }
});

router.get('/', async (req, res) => {
    try {
        const messages = await db.contactMessage.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json(messages);
    } catch (error) {
        console.error('[CONTACT_GET]', error);
        res.status(500).send('Internal Error');
    }
});

export default router;
