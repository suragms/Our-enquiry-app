import express from 'express';
import { db } from '../db';

const router = express.Router();

// Create new enquiry
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, requirement } = req.body;

        if (!name || !email || !requirement) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const message = await db.contactMessage.create({
            data: {
                name,
                email,
                phone: phone || null,
                requirement,
            },
        });

        res.json(message);
    } catch (error) {
        console.error('[CONTACT_POST]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Get all enquiries
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
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Update enquiry (mark as read)
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isRead, isStarred } = req.body;

        const updateData: any = {};
        if (typeof isRead === 'boolean') updateData.isRead = isRead;
        if (typeof isStarred === 'boolean') updateData.isStarred = isStarred;

        const message = await db.contactMessage.update({
            where: { id },
            data: updateData,
        });

        res.json(message);
    } catch (error) {
        console.error('[CONTACT_PATCH]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

// Delete enquiry
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.contactMessage.delete({
            where: { id },
        });

        res.json({ success: true });
    } catch (error) {
        console.error('[CONTACT_DELETE]', error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

export default router;
